import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HeroOverview from '../HeroOverview';

// Mock next/image
vi.mock('next/image', () => {
  return {
    default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
  };
});

describe('HeroOverview Component', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('dispatches open-whatsapp event on CTA click and scrolls on Experience click', () => {
    const dispatchMock = vi.fn();
    vi.stubGlobal('dispatchEvent', dispatchMock);

    const scrollMock = vi.fn();
    vi.spyOn(document, 'getElementById').mockReturnValue({
      scrollIntoView: scrollMock,
    } as any);

    render(<HeroOverview />);

    // Verificar título principal y subtítulo
    expect(screen.getByText('Retiro Despertar')).toBeInTheDocument();
    expect(screen.getByText('Un Encuentro de Almas y Sanación')).toBeInTheDocument();

    // Click en el CTA para inscribirse ("Reservar mi Lugar")
    const ctaButton = screen.getByRole('button', { name: /Reservar mi Lugar/i });
    fireEvent.click(ctaButton);

    expect(dispatchMock).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'open-whatsapp' })
    );

    // Click en "Ver la Experiencia"
    const experienceLink = screen.getByRole('link', { name: /Ver la Experiencia/i });
    fireEvent.click(experienceLink);

    expect(document.getElementById).toHaveBeenCalledWith('experiencia');
    expect(scrollMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });
});
