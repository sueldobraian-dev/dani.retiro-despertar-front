import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import WrittenTestimonialsCarousel from '../WrittenTestimonialsCarousel';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            order: vi.fn(() => ({
              order: vi.fn(() => ({
                range: vi.fn(async () => ({ data: null, error: new Error('Simulated error') })),
                limit: vi.fn(async () => ({ data: null, error: new Error('Simulated error') })),
              })),
            })),
          })),
        })),
      })),
    })),
    rpc: vi.fn(async () => ({ data: 1, error: null })),
  },
}));

describe('WrittenTestimonialsCarousel Component', () => {
  it('renders initial 10 testimonials and heart like buttons without displaying like count', async () => {
    render(<WrittenTestimonialsCarousel />);

    // Esperar a que cargue la lista inicial de 10
    await waitFor(() => {
      expect(screen.getByText('Carolina Gómez')).toBeInTheDocument();
      expect(screen.getByText('Silvina Rivas')).toBeInTheDocument();
    });

    // Validar presencia de botones de me gusta
    const likeButtons = screen.getAllByRole('button', { name: /Dar me gusta/i });
    expect(likeButtons.length).toBeGreaterThanOrEqual(10);

    // Verificar que el contador numérico de likes NO se muestra en el DOM
    expect(screen.queryByText('42')).not.toBeInTheDocument();
    expect(screen.queryByText('38')).not.toBeInTheDocument();

    // Validar que existe el botón para ver siguientes 10
    const nextBatchBtn = screen.getByRole('button', { name: /Ver siguientes 10/i });
    expect(nextBatchBtn).toBeInTheDocument();

    // Hacer clic en cargar más
    fireEvent.click(nextBatchBtn);

    // Esperar a que se anexen los testimonios del segundo lote (ej: Agustín Peralta)
    await waitFor(() => {
      expect(screen.getByText('Agustín Peralta')).toBeInTheDocument();
      expect(screen.getByText('Romina Tagliaferro')).toBeInTheDocument();
    });
  });

  it('toggles like button on click', async () => {
    render(<WrittenTestimonialsCarousel />);

    await waitFor(() => {
      expect(screen.getByText('Carolina Gómez')).toBeInTheDocument();
    });

    const firstLikeBtn = screen.getAllByRole('button', { name: /Dar me gusta/i })[0];
    fireEvent.click(firstLikeBtn);

    // Debe cambiar su aria-label a Quitar me gusta
    expect(firstLikeBtn).toHaveAttribute('aria-label', 'Quitar me gusta');
  });
});
