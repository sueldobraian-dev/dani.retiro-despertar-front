import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ImageCarousel from '../ImageCarousel';

// Mock next/image
vi.mock('next/image', () => {
  return {
    default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
  };
});

// Mock next/link
vi.mock('next/link', () => {
  return {
    default: ({ children, href, ...props }: any) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  };
});

describe('ImageCarousel Component', () => {
  it('renders experience cards with links to respective gallery sections', () => {
    render(<ImageCarousel />);

    // Validar enlaces de las tarjetas
    const yogaCard = screen.getByText('Espacio de Meditación & Yoga').closest('a');
    expect(yogaCard).toHaveAttribute('href', '/galeria#actividades');

    const comidaCard = screen.getByText('Nutrición consciente y saludable').closest('a');
    expect(comidaCard).toHaveAttribute('href', '/galeria#gastronomia');

    const fogonCard = screen.getByText('Círculo de fuego y sanación grupal').closest('a');
    expect(fogonCard).toHaveAttribute('href', '/galeria#retiro-despertar/tigre-delta-minahasa');

    const deltaCard = screen.getByText('Entorno natural único y de desconexión').closest('a');
    expect(deltaCard).toHaveAttribute('href', '/galeria#retiro-despertar/chascomus-finca-los-coipos');

    // Debe tener el enlace a /experiencia
    const experienceBtn = screen.getByRole('link', { name: /Ver más sobre la experiencia/i });
    expect(experienceBtn).toHaveAttribute('href', '/experiencia');
  });
});
