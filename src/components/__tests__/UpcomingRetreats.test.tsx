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
        max_capacity: 9,
        locations: {
          id: 'l1',
          name: 'Finca del Sol',
          address: 'Chascomús, BsAs',
          maps_url: 'https://maps.google.com',
          directions: 'Tomar Ruta 2',
          gallery_url: '/galeria#retiro-despertar/chascomus-finca-los-coipos',
        }
      }
    ];

    mockSelect.mockResolvedValueOnce({ data: mockRetreats, error: null });

    render(<UpcomingRetreats />);

    await waitFor(() => {
      expect(screen.getByText('Retiro Despertar - Finca del Sol')).toBeInTheDocument();
      expect(screen.getByText('Finca del Sol')).toBeInTheDocument();
      expect(screen.getByText(/Chascomús, BsAs/i)).toBeInTheDocument();
      expect(screen.getByText(/Cupos limitados a 9 personas/i)).toBeInTheDocument();
      expect(screen.getByText(/Ver Galería/i)).toBeInTheDocument();
      expect(screen.getByText(/Ver Experiencia/i)).toBeInTheDocument();
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

  it('shows unconfirmed retreats only in Calendario de Retiros and renders the active empty state in Próxima Fecha', async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 20);
    const startStr = futureDate.toISOString().split('T')[0];

    const mockUnconfirmedRetreats = [
      {
        id: 'r2',
        title: 'Retiro Despertar - Edición Primavera',
        start_date: startStr,
        end_date: startStr,
        is_confirmed: false,
        status_text: 'Octubre / Noviembre (A confirmar)',
        max_capacity: 9,
        locations: {
          id: 'l1',
          name: 'Finca los Coipos',
          address: 'Chascomús, BsAs',
          maps_url: 'https://maps.google.com',
          directions: null,
          gallery_url: '/galeria#retiro-despertar/chascomus-finca-los-coipos',
        },
      },
    ];

    mockSelect.mockResolvedValueOnce({ data: mockUnconfirmedRetreats, error: null });

    render(<UpcomingRetreats />);

    await waitFor(() => {
      // Empty state activo en el bloque principal
      expect(screen.getByText('Estamos preparando nuestro próximo encuentro')).toBeInTheDocument();
      expect(screen.getByText('Sumarme a la Lista Prioritaria')).toBeInTheDocument();

      // El retiro no confirmado aparece en Calendario de Retiros con su status_text y enlaces a Experiencia y Galería
      expect(screen.getByText('Retiro Despertar - Edición Primavera')).toBeInTheDocument();
      expect(screen.getByText('Octubre / Noviembre (A confirmar)')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Ver Experiencia/i })).toHaveAttribute(
        'href',
        '/experiencia#retiro-despertar/chascomus-finca-los-coipos'
      );
      expect(screen.getByRole('link', { name: /Ver Galería/i })).toHaveAttribute(
        'href',
        '/galeria#retiro-despertar/chascomus-finca-los-coipos'
      );
    });
  });
});
