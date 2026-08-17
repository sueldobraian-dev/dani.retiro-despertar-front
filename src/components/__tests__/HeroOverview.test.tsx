import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroOverview from '../HeroOverview';

// Mock next/image
vi.mock('next/image', () => {
  return {
    default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
  };
});

// Mock next/link
vi.mock('next/link', () => {
  return {
    default: ({ children, href, ...props }: any) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  };
});

// Mock supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        gte: vi.fn(() => ({
          order: vi.fn(() => ({
            limit: vi.fn().mockResolvedValue({
              data: [
                {
                  id: '1',
                  locations: {
                    gallery_url: '/galeria#retiro-despertar/chascomus-finca-los-coipos',
                  },
                },
              ],
              error: null,
            }),
          })),
        })),
      })),
    })),
  },
}));

describe('HeroOverview Component', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('renders title, subtitle, chef text and experience links', async () => {
    render(<HeroOverview />);

    expect(screen.getByText('Retiro Despertar')).toBeInTheDocument();
    expect(screen.getByText('Un Encuentro de Almas y Sanación')).toBeInTheDocument();
    expect(screen.getByText('chef privado')).toBeInTheDocument();

    const retreatsLink = screen.getByRole('link', { name: /Próximo Retiro/i });
    expect(retreatsLink).toHaveAttribute('href', '/experiencia#retiro-despertar/chascomus-finca-los-coipos');

    const experienceLink = screen.getByRole('link', { name: /Conocer la experiencia/i });
    expect(experienceLink).toHaveAttribute('href', '/experiencia');
  });
});
