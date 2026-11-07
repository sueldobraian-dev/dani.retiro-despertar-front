import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestimoniosPage from '../page';

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

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('TestimoniosPage Route Component', () => {
  it('renders hero title, comparison notice, and call to action', () => {
    render(<TestimoniosPage />);

    // Verificar títulos principales
    expect(screen.getByText('Experiencias y Sentimientos Reales')).toBeInTheDocument();
    expect(screen.getByText('Testimonios por Escrito')).toBeInTheDocument();
    expect(screen.getByText(/Módulo Comparativo de Formatos de Video/i)).toBeInTheDocument();

    // Verificar CTAs
    expect(screen.getByText(/Consultar por WhatsApp/i)).toBeInTheDocument();
    expect(screen.getByText(/Ver Próximos Retiros/i)).toBeInTheDocument();
  });
});
