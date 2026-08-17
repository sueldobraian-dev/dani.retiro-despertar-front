import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ExperienceLocationCarousel from '../ExperienceLocationCarousel';

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

describe('ExperienceLocationCarousel Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches images with tag and orderBy=experience-order, opens lightbox on click and navigates', async () => {
    const mockImages = [
      {
        id: '1',
        src: 'https://res.cloudinary.com/demo/image/upload/finca1.jpg',
        largeSrc: 'https://res.cloudinary.com/demo/image/upload/finca1_large.jpg',
        alt: 'Laguna Los Coipos',
        title: 'Laguna Los Coipos',
        order: 1,
        experienceOrder: 1,
      },
      {
        id: '2',
        src: 'https://res.cloudinary.com/demo/image/upload/finca2.jpg',
        largeSrc: 'https://res.cloudinary.com/demo/image/upload/finca2_large.jpg',
        alt: 'Arboleda y Caballos',
        title: 'Arboleda y Caballos',
        order: 2,
        experienceOrder: 2,
      },
    ];

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockImages,
    } as any);

    render(<ExperienceLocationCarousel tag="finca-los-coipos" title="Postales de Finca Los Coipos" />);

    expect(screen.getByText('Postales de Finca Los Coipos')).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('/api/gallery?tag=finca-los-coipos&orderBy=experience-order');
      expect(screen.getByAltText('Laguna Los Coipos')).toBeInTheDocument();
    });

    // Abrir foto en Lightbox al presionar
    const firstPhotoCard = screen.getByRole('button', { name: /Ver foto ampliada: Laguna Los Coipos/i });
    fireEvent.click(firstPhotoCard);

    // Debe mostrarse el modal y contador 1 de 2
    expect(screen.getByRole('dialog', { name: /Visualizador de fotos ampliado/i })).toBeInTheDocument();
    expect(screen.getByText('1 de 2')).toBeInTheDocument();

    // Presionar siguiente foto
    const nextBtn = screen.getByRole('button', { name: /Foto siguiente/i });
    fireEvent.click(nextBtn);
    expect(screen.getByText('2 de 2')).toBeInTheDocument();

    // Presionar cerrar modal
    const closeBtn = screen.getByRole('button', { name: /Cerrar modal/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('handles empty image response gracefully without throwing', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as any);

    const { container } = render(<ExperienceLocationCarousel tag="finca-los-coipos" />);

    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });
});
