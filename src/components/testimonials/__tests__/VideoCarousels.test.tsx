import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import VideoCarousel16x9 from '../VideoCarousel16x9';
import ShortsCarousel9x16 from '../ShortsCarousel9x16';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            order: vi.fn(() => ({
              order: vi.fn(async () => ({ data: null, error: new Error('Simulated error') })),
            })),
          })),
        })),
      })),
    })),
    rpc: vi.fn(async () => ({ data: 1, error: null })),
  },
}));

describe('Video Testimonial Carousels', () => {
  describe('VideoCarousel16x9', () => {
    it('renders 16:9 YouTube videos including Atardecer en la laguna and opens player modal', async () => {
      render(<VideoCarousel16x9 />);

      await waitFor(() => {
        expect(screen.getByText('Atardecer en la laguna')).toBeInTheDocument();
      });

      // Validar badges y formato
      expect(screen.getByText(/Opción A: Formato Horizontal \(16:9\)/i)).toBeInTheDocument();

      // Abrir modal al hacer clic en ver video
      const watchButtons = screen.getAllByRole('button', { name: /Ver video completo/i });
      fireEvent.click(watchButtons[0]);

      // Verificar que el modal se abre
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByTitle('Atardecer en la laguna')).toBeInTheDocument();

      // Cerrar modal
      const closeBtn = screen.getByRole('button', { name: /Cerrar video/i });
      fireEvent.click(closeBtn);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('ShortsCarousel9x16', () => {
    it('renders 9:16 YouTube Shorts including Testimonio 1 - Retiro Despertar', async () => {
      render(<ShortsCarousel9x16 />);

      await waitFor(() => {
        expect(screen.getByText('Testimonio 1 - Retiro Despertar')).toBeInTheDocument();
      });

      // Validar badges y formato
      expect(screen.getByText(/Opción B: Formato Vertical Shorts \(9:16\)/i)).toBeInTheDocument();

      // Abrir modal al hacer clic en el Short
      const shortCard = screen.getByText('Testimonio 1 - Retiro Despertar').closest('.cursor-pointer');
      if (shortCard) {
        fireEvent.click(shortCard);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      }
    });
  });
});
