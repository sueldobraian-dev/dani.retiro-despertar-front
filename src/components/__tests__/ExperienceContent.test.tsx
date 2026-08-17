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

  it('switches to Chascomús capsule with parameterized coupon links', () => {
    render(<ExperienceContent />);

    const chascomusTab = screen.getByRole('button', { name: /Finca Los Coipos/i });
    fireEvent.click(chascomusTab);

    expect(screen.getByText('Finca Los Coipos – Chascomús')).toBeInTheDocument();
    expect(screen.getByText('Constelaciones con Caballos')).toBeInTheDocument();
    expect(screen.getByText(/Quiero mi cupón de preventa/i)).toBeInTheDocument();
    expect(screen.getByText(/Quiero mi cupón promocional para 2 o más personas/i)).toBeInTheDocument();

    const preventaLink = screen.getByText(/Quiero mi cupón de preventa/i).closest('a');
    expect(preventaLink).toHaveAttribute('href', expect.stringContaining('PREVENTA10'));
  });

  it('switches to Tigre Delta capsule when tab is clicked', () => {
    render(<ExperienceContent />);

    const deltaTab = screen.getByRole('button', { name: /Complejo Minahasa/i });
    fireEvent.click(deltaTab);

    expect(screen.getByText('Complejo Minahasa – Tigre (Delta)')).toBeInTheDocument();
    expect(screen.getByText(/Próximamente estaremos anunciando/i)).toBeInTheDocument();
  });
});
