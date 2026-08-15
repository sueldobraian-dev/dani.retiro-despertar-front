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

  it('scrolls to Proximos Retiros and Experiencia sections on button clicks', () => {
    const scrollMock = vi.fn();
    vi.spyOn(document, 'getElementById').mockReturnValue({
      scrollIntoView: scrollMock,
    } as any);

    render(<HeroOverview />);

    // Verificar título principal, subtítulo y chef privado
    expect(screen.getByText('Retiro Despertar')).toBeInTheDocument();
    expect(screen.getByText('Un Encuentro de Almas y Sanación')).toBeInTheDocument();
    expect(screen.getByText('chef privado')).toBeInTheDocument();

    // Click en "Próximos Retiros"
    const retreatsLink = screen.getByRole('link', { name: /Próximos Retiros/i });
    fireEvent.click(retreatsLink);

    expect(document.getElementById).toHaveBeenCalledWith('proximos-retiros');
    expect(scrollMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });

    // Click en "Conocer la experiencia"
    const experienceLink = screen.getByRole('link', { name: /Conocer la experiencia/i });
    fireEvent.click(experienceLink);

    expect(document.getElementById).toHaveBeenCalledWith('experiencia');
    expect(scrollMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });
});
