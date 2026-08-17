import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ExperienceContent from '../ExperienceContent';

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('ExperienceContent Component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders Quiénes Somos capsule by default with 2 team photos', () => {
    render(<ExperienceContent />);

    expect(screen.getByText('Un Viaje al Centro del Alma')).toBeInTheDocument();
    expect(screen.getByText('Vero & Nancy')).toBeInTheDocument();
    expect(screen.getByText('Dani')).toBeInTheDocument();
    expect(screen.getByAltText('Facilitadoras: Vero y Nancy')).toBeInTheDocument();
    expect(screen.getByAltText('Organizadora: Dani')).toBeInTheDocument();
  });

  it('switches to Chascomús capsule with parameterized coupon links, terms link and team modal', () => {
    render(<ExperienceContent />);

    const chascomusTab = screen.getByRole('button', { name: /Finca Los Coipos/i });
    fireEvent.click(chascomusTab);

    expect(screen.getByText('Finca Los Coipos – Chascomús')).toBeInTheDocument();
    expect(screen.getByText('Constelaciones con Caballos')).toBeInTheDocument();
    expect(screen.getByText(/Quiero mi cupón de preventa/i)).toBeInTheDocument();
    expect(screen.getByText(/Quiero mi cupón promocional para 2 o más personas/i)).toBeInTheDocument();

    const preventaLink = screen.getByText(/Quiero mi cupón de preventa/i).closest('a');
    expect(preventaLink).toHaveAttribute('href', expect.stringContaining('PREVENTA10'));

    const termsLink = screen.getByText('Términos y Condiciones de Reserva').closest('a');
    expect(termsLink).toHaveAttribute('href', '/terminos');

    // Probar apertura del modal de facilitadoras
    const teamBtn = screen.getByRole('button', { name: /Conocer Facilitadoras/i });
    fireEvent.click(teamBtn);

    expect(screen.getByRole('dialog', { name: /Información del equipo y facilitadoras/i })).toBeInTheDocument();
    expect(screen.getByText('Quiénes Somos • Equipo Despertar')).toBeInTheDocument();

    // Cerrar modal
    const closeBtn = screen.getByRole('button', { name: /Cerrar modal/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog', { name: /Información del equipo y facilitadoras/i })).not.toBeInTheDocument();
  });

  it('switches to Tigre Delta capsule when tab is clicked', () => {
    render(<ExperienceContent />);

    const deltaTab = screen.getByRole('button', { name: /Complejo Minahasa/i });
    fireEvent.click(deltaTab);

    expect(screen.getByText('Complejo Minahasa – Tigre (Delta)')).toBeInTheDocument();
    expect(screen.getByText(/Próximamente estaremos anunciando/i)).toBeInTheDocument();
  });
});
