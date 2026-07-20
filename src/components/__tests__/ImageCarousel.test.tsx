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

describe('ImageCarousel Component', () => {
  it('renders experience images and redirect link to gallery', () => {
    render(<ImageCarousel />);

    // Debe renderizar las imágenes del entorno
    expect(screen.getByAltText('Meditación grupal en la naturaleza')).toBeInTheDocument();
    expect(screen.getByAltText('Comida saludable y vegetariana')).toBeInTheDocument();

    // Debe tener el enlace a la galería
    const link = screen.getByRole('link', { name: /Ver más sobre la experiencia/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/galeria');
  });
});
