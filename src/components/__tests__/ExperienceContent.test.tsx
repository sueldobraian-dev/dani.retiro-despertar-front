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

vi.mock('@/components/experience/ExperienceLocationCarousel', () => ({
  default: () => <div data-testid="location-carousel">Carousel Mock</div>,
}));

describe('ExperienceContent Component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders Quiénes Somos capsule with 2 team photos by default (tabs mode)', () => {
    render(<ExperienceContent />);

    expect(screen.getByText('Un Viaje al Centro del Alma')).toBeInTheDocument();
    expect(screen.getByText('Vero & Nancy')).toBeInTheDocument();
    expect(screen.getByText('Dani')).toBeInTheDocument();
    expect(screen.getByAltText('Facilitadoras: Vero y Nancy')).toBeInTheDocument();
    expect(screen.getByAltText('Organizadora: Dani')).toBeInTheDocument();
    expect(screen.queryByText('Finca Los Coipos – Chascomús')).not.toBeInTheDocument();
  });

  it('switches to Chascomús capsule in tabs mode with promo coupons, terms link and team modal', () => {
    render(<ExperienceContent />);

    const chascomusTab = screen.getByRole('button', { name: /Finca Los Coipos/i });
    fireEvent.click(chascomusTab);

    expect(screen.getByText('Finca Los Coipos – Chascomús')).toBeInTheDocument();
    expect(screen.getByText('Constelaciones con Caballos')).toBeInTheDocument();
    expect(screen.getByText('Cómo llegar a Finca Los Coipos')).toBeInTheDocument();
    expect(screen.getByText(/Quiero mi cupón de preventa/i)).toBeInTheDocument();

    const termsLink = screen.getByText('Términos y Condiciones de Reserva').closest('a');
    expect(termsLink).toHaveAttribute('href', '/terminos');

    // Probar apertura del modal de facilitadoras
    const teamBtn = screen.getByRole('button', { name: /Conocer Facilitadoras/i });
    fireEvent.click(teamBtn);

    expect(
      screen.getByRole('dialog', { name: /Información del equipo y facilitadoras/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Quiénes Somos • Equipo Despertar')).toBeInTheDocument();

    // Cerrar modal
    const closeBtn = screen.getByRole('button', { name: /Cerrar modal/i });
    fireEvent.click(closeBtn);
    expect(
      screen.queryByRole('dialog', { name: /Información del equipo y facilitadoras/i })
    ).not.toBeInTheDocument();
  });

  it('switches to Tigre Delta capsule when tab is clicked in tabs mode', () => {
    render(<ExperienceContent navigationMode="tabs" />);

    const deltaTab = screen.getByRole('button', { name: /Complejo Minahasa/i });
    fireEvent.click(deltaTab);

    expect(screen.getByText('Complejo Minahasa – Tigre (Delta)')).toBeInTheDocument();
    expect(screen.getByText(/Próximamente estaremos anunciando/i)).toBeInTheDocument();
  });

  it('renders all capsules simultaneously in continuous-scroll mode and scrolls smoothly on tab click', () => {
    render(<ExperienceContent navigationMode="continuous-scroll" />);

    expect(screen.getByText('Vero & Nancy')).toBeInTheDocument();
    expect(screen.getByText('Finca Los Coipos – Chascomús')).toBeInTheDocument();
    expect(screen.getByText('Complejo Minahasa – Tigre (Delta)')).toBeInTheDocument();

    const scrollSpy = vi.spyOn(window.HTMLElement.prototype, 'scrollIntoView');
    const deltaTab = screen.getByRole('button', { name: /Complejo Minahasa/i });
    fireEvent.click(deltaTab);

    expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });
});
