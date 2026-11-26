import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DespiertaIndumentariaHolisticaPage from '../page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: vi.fn(),
    push: vi.fn(),
  }),
}));

vi.mock('next/image', () => ({
  default: ({ alt, src, fill, priority, ...props }: any) => (
    <img alt={alt} src={src} {...props} />
  ),
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('DespiertaIndumentariaHolisticaPage Component', () => {
  it('renders the brand heading and under-construction message', () => {
    render(<DespiertaIndumentariaHolisticaPage />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Despierta indumentaria holística/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/Catálogo en construcción/i)).toBeInTheDocument();
    expect(
      screen.getByText(/preparando nuestro catálogo de ropa holística/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/despertar tu belleza natural desde el interior/i)
    ).toBeInTheDocument();
  });

  it('renders the Despierta clothing brand logo image', () => {
    render(<DespiertaIndumentariaHolisticaPage />);

    const logoImage = screen.getByRole('img', {
      name: /Logo Despierta indumentaria holística/i,
    });
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/images/indumentaria/logo-despierta.jpg');
  });

  it('provides navigation links back to the main site', () => {
    render(<DespiertaIndumentariaHolisticaPage />);

    expect(
      screen.getByRole('button', { name: /Volver al inicio/i })
    ).toBeInTheDocument();

    const homeLink = screen.getByRole('link', {
      name: /Explorar Retiro Despertar/i,
    });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});

