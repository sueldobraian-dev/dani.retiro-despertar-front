import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import FeedbackCarousel from '../FeedbackCarousel';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            order: vi.fn(() => ({
              order: vi.fn(() => ({
                limit: vi.fn(async () => ({ data: null, error: new Error('Network error') })),
              })),
            })),
          })),
        })),
      })),
    })),
    rpc: vi.fn(async () => ({ data: 1, error: null })),
  },
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('FeedbackCarousel Component', () => {
  it('renders participant testimonies, heart buttons without numbers, and link to /testimonios', async () => {
    render(<FeedbackCarousel />);

    // Verificar encabezado de testimonios
    expect(screen.getByText(/Lo que Dicen Nuestros Participantes/i)).toBeInTheDocument();

    // Esperar a que carguen los testimonios del fallback
    await waitFor(() => {
      expect(screen.getByText('Carolina Gómez')).toBeInTheDocument();
      expect(screen.getByText('Mariano Silva')).toBeInTheDocument();
      expect(screen.getByText('Valeria Castro')).toBeInTheDocument();
      expect(screen.getByText('Lucía Benítez')).toBeInTheDocument();
    });

    // Validar el botón CTA "Ver más testimonios" hacia /testimonios
    const verMasBtn = screen.getByRole('link', { name: /Ver más testimonios/i });
    expect(verMasBtn).toBeInTheDocument();
    expect(verMasBtn).toHaveAttribute('href', '/testimonios');

    // Validar botones de like con ícono de corazón
    const heartButtons = screen.getAllByRole('button', { name: /Dar me gusta/i });
    expect(heartButtons.length).toBe(4);

    // Asegurar que NO se muestren contadores de likes
    expect(screen.queryByText('42')).not.toBeInTheDocument();
    expect(screen.queryByText('38')).not.toBeInTheDocument();
  });
});
