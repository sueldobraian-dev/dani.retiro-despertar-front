import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RedesHubContent, { buildTrackedUrl } from '../RedesHubContent';

vi.mock('next/image', () => ({
  default: ({ alt, src, fill, priority, ...props }: any) => (
    <img alt={alt} src={src} {...props} />
  ),
}));

describe('RedesHubContent Component', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it('renders all 4 official links with their exact target URLs', () => {
    render(<RedesHubContent />);

    const sitioLink = screen.getByRole('link', {
      name: /Sitio Oficial — Retiro Despertar/i,
    });
    expect(sitioLink).toHaveAttribute('href', 'https://retiro-despertar.vercel.app/#inicio');

    const catalogoLink = screen.getByRole('link', {
      name: /Despierta Indumentaria Holística/i,
    });
    expect(catalogoLink).toHaveAttribute(
      'href',
      'https://retiro-despertar.vercel.app/despierta-indumentaria-holistica'
    );

    const igRetirosLink = screen.getByRole('link', {
      name: /Instagram — Retiro Despertar/i,
    });
    expect(igRetirosLink).toHaveAttribute(
      'href',
      'https://www.instagram.com/despertar.retiroholistico'
    );

    const igRopaLink = screen.getByRole('link', {
      name: /Instagram — Despierta Indumentaria/i,
    });
    expect(igRopaLink).toHaveAttribute('href', 'https://www.instagram.com/despierta.ropa');
  });

  it('copies the official /redes link to clipboard and shows confirmation', async () => {
    render(<RedesHubContent />);

    const copyBtn = screen.getByRole('button', {
      name: /Copiar enlace de esta página/i,
    });
    fireEvent.click(copyBtn);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'https://retiro-despertar.vercel.app/redes'
      );
      expect(screen.getByText(/¡Enlace copiado!/i)).toBeInTheDocument();
    });
  });

  it('opens and closes the print QR modal and triggers SVG download', () => {
    const createObjectUrlMock = vi.fn().mockReturnValue('blob:mock-qr-svg');
    const revokeObjectUrlMock = vi.fn();
    vi.stubGlobal('URL', {
      ...URL,
      createObjectURL: createObjectUrlMock,
      revokeObjectURL: revokeObjectUrlMock,
    });

    render(<RedesHubContent />);

    const openQrBtn = screen.getByRole('button', {
      name: /Ver QR para Panfletos \/ Banners/i,
    });
    fireEvent.click(openQrBtn);

    expect(
      screen.getByRole('dialog', { name: /Código QR Oficial/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', {
        name: /Código QR hacia retiro-despertar.vercel.app\/redes/i,
      })
    ).toBeInTheDocument();

    // Verifica que exista el botón de descarga del panfleto diseñado y los selectores UTM
    const flyerDownloadLink = screen.getByRole('link', {
      name: /Descargar Panfleto Diseñado Listo para Imprimir/i,
    });
    expect(flyerDownloadLink).toHaveAttribute('href', '/images/panfleto-despertar-qr.png');

    const bannerPresetBtn = screen.getByRole('button', { name: /Banner \/ Lona/i });
    fireEvent.click(bannerPresetBtn);
    expect(screen.getByText(/utm_source=banner/i)).toBeInTheDocument();

    const downloadSvgBtn = screen.getByRole('button', {
      name: /Descargar Solo QR en SVG/i,
    });
    fireEvent.click(downloadSvgBtn);
    expect(createObjectUrlMock).toHaveBeenCalled();

    const closeBtn = screen.getByRole('button', {
      name: /Cerrar ventana de código QR/i,
    });
    fireEvent.click(closeBtn);

    expect(
      screen.queryByRole('dialog', { name: /Código QR Oficial/i })
    ).not.toBeInTheDocument();
  });

  it('propagates UTM parameters to internal links while keeping external links untouched', () => {
    expect(
      buildTrackedUrl(
        'https://retiro-despertar.vercel.app/#inicio',
        false,
        'utm_source=panfleto&utm_medium=qr'
      )
    ).toBe('https://retiro-despertar.vercel.app/?utm_source=panfleto&utm_medium=qr#inicio');

    expect(
      buildTrackedUrl(
        'https://retiro-despertar.vercel.app/despierta-indumentaria-holistica',
        false,
        'utm_source=panfleto&utm_medium=qr'
      )
    ).toBe(
      'https://retiro-despertar.vercel.app/despierta-indumentaria-holistica?utm_source=panfleto&utm_medium=qr'
    );

    expect(
      buildTrackedUrl(
        'https://www.instagram.com/despierta.ropa',
        true,
        'utm_source=panfleto&utm_medium=qr'
      )
    ).toBe('https://www.instagram.com/despierta.ropa');
  });
});

