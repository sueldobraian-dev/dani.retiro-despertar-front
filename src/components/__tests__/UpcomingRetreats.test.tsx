import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import UpcomingRetreats from '../UpcomingRetreats';

const mockSelect = vi.fn();

vi.mock('@/lib/supabase', () => {
  return {
    supabase: {
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          gte: vi.fn(() => ({
            order: mockSelect,
          })),
        })),
      })),
    },
  };
});

describe('UpcomingRetreats Component', () => {
  beforeEach(() => {
    mockSelect.mockReset();
  });

  it('renders loading state initially', () => {
    mockSelect.mockReturnValue(new Promise(() => {})); // Nunca resuelve para simular carga
    const { container } = render(<UpcomingRetreats />);

    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders upcoming retreats and countdown timer when loaded successfully', async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5); // 5 días en el futuro
    const startStr = futureDate.toISOString().split('T')[0];

    const mockRetreats = [
      {
        id: 'r1',
        title: 'Retiro Despertar - Finca del Sol',
        start_date: startStr,
        end_date: startStr,
        is_confirmed: true,
        status_text: null,
        locations: {
          id: 'l1',
          name: 'Finca del Sol',
          address: 'Chascomús, BsAs',
          maps_url: 'https://maps.google.com',
          directions: 'Tomar Ruta 2',
        }
      }
    ];

    mockSelect.mockResolvedValueOnce({ data: mockRetreats, error: null });

    render(<UpcomingRetreats />);

    await waitFor(() => {
      expect(screen.getByText('Retiro Despertar - Finca del Sol')).toBeInTheDocument();
      expect(screen.getByText('Finca del Sol')).toBeInTheDocument();
      expect(screen.getByText(/Chascomús, BsAs/i)).toBeInTheDocument();
    });

    // Validar el timer
    expect(screen.getByText('Días')).toBeInTheDocument();
    expect(screen.getByText('Horas')).toBeInTheDocument();
  });

  it('renders error state when Supabase fetch fails', async () => {
    mockSelect.mockResolvedValueOnce({ data: null, error: new Error('Network error') });

    render(<UpcomingRetreats />);

    await waitFor(() => {
      expect(screen.getByText(/No pudimos cargar las fechas/i)).toBeInTheDocument();
    });
  });
});
