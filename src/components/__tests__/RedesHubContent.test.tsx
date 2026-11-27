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

    const circuloManosImg = screen.getByRole('img', {
      name: /Círculo de manos Retiro Despertar/i,
    });
    expect(circuloManosImg).toHaveAttribute('src', '/images/experience/circulo_infinito.jpg');

    const logoDespiertaImg = screen.getByRole('img', {
      name: /Logo Despierta Indumentaria Holística/i,
    });
    expect(logoDespiertaImg).toHaveAttribute('src', '/images/indumentaria/logo-despierta.jpg');

    const sitioLink = screen.getByRole('link', {
      name: /Web Oficial Retiro Despertar/i,
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
      name: /Despertar Retiro @despertar\.retiroholistico/i,
    });
    expect(igRetirosLink).toHaveAttribute(
      'href',
      'https://www.instagram.com/despertar.retiroholistico'
    );

    const igRopaLink = screen.getByRole('link', {
      name: /Despierta Indumentaria @despierta\.ropa/i,
    });
    expect(igRopaLink).toHaveAttribute('href', 'https://www.instagram.com/despierta.ropa');
  });

  it('copies the official /redes link when clicking the share icon button and does not expose internal QR tools', async () => {
    render(<RedesHubContent />);

    expect(
      screen.queryByRole('button', { name: /Panfletos \/ Banners/i })
    ).not.toBeInTheDocument();

    const shareBtn = screen.getByRole('button', {
      name: /Compartir enlace/i,
    });
    fireEvent.click(shareBtn);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'https://retiro-despertar.vercel.app/redes'
      );
    });
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
