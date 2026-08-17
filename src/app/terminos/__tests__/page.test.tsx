import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TerminosPage from '../page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: vi.fn(),
    push: vi.fn(),
  }),
}));

describe('TerminosPage Component', () => {
  it('renders terms and conditions heading, health disclaimer, payment policies and media release', () => {
    render(<TerminosPage />);

    expect(screen.getByRole('heading', { level: 1, name: /Términos y Condiciones/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Volver/i })).toBeInTheDocument();
    expect(screen.getByText(/Descripción de la Experiencia/i)).toBeInTheDocument();
    expect(screen.getByText(/Descargo de Responsabilidad sobre Salud y Bienestar/i)).toBeInTheDocument();
    expect(screen.getByText(/no constituyen ni reemplazan/i)).toBeInTheDocument();
    expect(screen.getByText(/Reserva, Seña y Condiciones de Pago/i)).toBeInTheDocument();
    expect(screen.getByText(/20% del valor total de la inversión/i)).toBeInTheDocument();
    expect(screen.getByText(/Políticas de Cancelación y Reembolso/i)).toBeInTheDocument();
    expect(screen.getByText(/Registro Audiovisual y Uso de Imagen/i)).toBeInTheDocument();
  });
});
