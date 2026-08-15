import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  it('renders footer layout, social links, and copyright text', () => {
    render(<Footer />);

    expect(screen.getByText('Retiro Despertar')).toBeInTheDocument();
    expect(screen.getByText(/Última actualización:/i)).toBeInTheDocument();
    
    // Links de redes sociales y créditos
    expect(screen.getByText('Braian Sueldo')).toBeInTheDocument();
    expect(screen.getByText('Daniela Garcia Cabrera')).toBeInTheDocument();

    // Links legales de Google Ads y Meta Ads compliance
    expect(screen.getByRole('link', { name: /Política de Privacidad/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Términos y Condiciones/i })).toBeInTheDocument();
  });
});
