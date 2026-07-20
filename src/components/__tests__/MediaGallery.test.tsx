import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MediaGallery from '../MediaGallery';

const mockFolders = {
  ubicaciones: [
    { name: 'Chascomús - Finca Los Coipos', path: 'retiro-despertar/chascomus-finca-los-coipos' }
  ],
  tematicas: [
    { name: 'Gastronomía', path: 'gastronomia' },
    { name: 'Actividades', path: 'actividades' }
  ]
};

// Usamos una data URI base64 válida para evitar que JSDOM dispare onError automáticamente por red
const base64Image = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const mockMedia = [
  {
    id: 'img1',
    type: 'image',
    src: base64Image,
    largeSrc: base64Image,
    alt: 'Plato Gastronómico',
    title: 'Plato Gastronómico',
    folder: 'gastronomia'
  }
];

describe('MediaGallery Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn((url: string) => {
      if (url.includes('getFolders=true')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockFolders)
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockMedia)
      });
    }));

    // Spy seguro sobre history.replaceState
    vi.spyOn(window.history, 'replaceState').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    window.location.hash = '';
  });

  it('loads folders and default category assets on mount', async () => {
    render(<MediaGallery />);

    // Esperar a que se carguen los botones de categorías
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Gastronomía/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Actividades/i })).toBeInTheDocument();
    });

    // Validar que se cargaron las imágenes de la categoría default (Gastronomía)
    await waitFor(() => {
      const img = screen.getByAltText('Plato Gastronómico');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', base64Image);
    });
  });

  it('filters out failed images automatically from display grid', async () => {
    render(<MediaGallery />);

    // 1. Esperar a que se carguen las categorías para asegurar estabilidad del estado
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Gastronomía/i })).toBeInTheDocument();
    });

    // 2. Esperar a que se cargue la imagen
    let img: HTMLElement;
    await waitFor(() => {
      img = screen.getByAltText('Plato Gastronómico');
      expect(img).toBeInTheDocument();
    });

    // 3. Simular error de carga (404)
    fireEvent.error(img!);

    // La imagen debe desaparecer de la vista
    await waitFor(() => {
      expect(screen.queryByAltText('Plato Gastronómico')).not.toBeInTheDocument();
    });
  });

  it('changes active folder and fetches new media items on category click', async () => {
    render(<MediaGallery />);

    // Esperar a que carguen categorías
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Actividades/i })).toBeInTheDocument();
    });

    // Click en la categoría Actividades
    const activeBtn = screen.getByRole('button', { name: /Actividades/i });
    fireEvent.click(activeBtn);

    // Debe consultar la API pidiendo tag=actividades
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('tag=actividades')
      );
    });
  });

  it('opens lightbox when clicking an image container after state is stable', async () => {
    render(<MediaGallery />);

    // 1. Esperar a que se carguen las categorías
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Gastronomía/i })).toBeInTheDocument();
    });

    // 2. Esperar a que la imagen se renderice
    let img: HTMLElement;
    await waitFor(() => {
      img = screen.getByAltText('Plato Gastronómico');
      expect(img).toBeInTheDocument();
    });

    // 3. Pequeña espera para asegurar que JSDOM haya procesado todas las actualizaciones pendientes y cierres de estado
    await new Promise((resolve) => setTimeout(resolve, 50));

    // 4. Click en el contenedor de la imagen para abrir el Lightbox
    const containerDiv = img!.closest('.cursor-pointer');
    expect(containerDiv).toBeInTheDocument();
    fireEvent.click(containerDiv!);

    // Debe mostrar la barra superior del Lightbox (1 de 1)
    await waitFor(() => {
      expect(screen.getByText('1 de 1')).toBeInTheDocument();
    });

    // Click en el botón de cerrar modal
    const closeBtn = screen.getByLabelText(/Cerrar modal/i);
    fireEvent.click(closeBtn);

    // El Lightbox debe estar cerrado
    await waitFor(() => {
      expect(screen.queryByText('1 de 1')).not.toBeInTheDocument();
    });
  });
});
