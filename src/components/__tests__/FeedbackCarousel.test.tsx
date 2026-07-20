import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FeedbackCarousel from '../FeedbackCarousel';

describe('FeedbackCarousel Component', () => {
  it('renders participant testimonies and ratings', () => {
    render(<FeedbackCarousel />);

    // Verificar encabezado de testimonios
    expect(screen.getByText(/Lo que Dicen Nuestros Participantes/i)).toBeInTheDocument();

    // Verificar la presencia de Carolina Gómez y los testimonios
    expect(screen.getByText('Carolina Gómez')).toBeInTheDocument();
    expect(screen.getByText('Mariano Silva')).toBeInTheDocument();
    expect(screen.getByText('Valeria Castro')).toBeInTheDocument();
  });
});
