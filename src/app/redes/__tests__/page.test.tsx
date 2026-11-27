import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RedesPage from '../page';

vi.mock('next/image', () => ({
  default: ({ alt, src, fill, priority, ...props }: any) => (
    <img alt={alt} src={src} {...props} />
  ),
}));

describe('RedesPage Component', () => {
  it('renders the social hub and embeds Schema.org JSON-LD with all 4 sameAs links', () => {
    const { container } = render(<RedesPage />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Retiro Despertar & Despierta Indumentaria/i,
      })
    ).toBeInTheDocument();

    const jsonLdScript = container.querySelector('script[type="application/ld+json"]');
    expect(jsonLdScript).not.toBeNull();
    const parsed = JSON.parse(jsonLdScript?.innerHTML || '{}');
    expect(parsed['@type']).toBe('ProfilePage');
    expect(parsed.mainEntity.sameAs).toEqual([
      'https://retiro-despertar.vercel.app/#inicio',
      'https://retiro-despertar.vercel.app/despierta-indumentaria-holistica',
      'https://www.instagram.com/despertar.retiroholistico',
      'https://www.instagram.com/despierta.ropa',
    ]);
  });
});

