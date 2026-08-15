import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TerminosPage from '../page';

describe('TerminosPage Component', () => {
  it('renders terms and conditions heading and health disclaimer section', () => {
    render(<TerminosPage />);

    expect(screen.getByRole('heading', { level: 1, name: /Términos y Condiciones/i })).toBeInTheDocument();
    expect(screen.getByText(/Descripción de la Experiencia/i)).toBeInTheDocument();
    expect(screen.getByText(/Descargo de Responsabilidad sobre Salud y Bienestar/i)).toBeInTheDocument();
    expect(screen.getByText(/no constituyen ni reemplazan/i)).toBeInTheDocument();
  });
});
