import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChascomusCapsule from '../ChascomusCapsule';

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

vi.mock('../ExperienceLocationCarousel', () => ({
  default: () => <div data-testid="location-carousel">Carousel Mock</div>,
}));

describe('ChascomusCapsule Component', () => {
  it('renders quick details including Pension Completa', () => {
    render(<ChascomusCapsule />);

    expect(screen.getByText('11 Hectáreas')).toBeInTheDocument();
    expect(screen.getByText('Pura naturaleza')).toBeInTheDocument();

    expect(screen.getByText('Laguna Privada')).toBeInTheDocument();
    expect(screen.getByText('Salida exclusiva')).toBeInTheDocument();

    expect(screen.getByText('Pensión Completa')).toBeInTheDocument();
    expect(screen.getByText('Menú consciente')).toBeInTheDocument();

    expect(screen.getByText('Cupos Limitados')).toBeInTheDocument();
    expect(screen.getByText('Máximo 9 personas')).toBeInTheDocument();
  });
});
