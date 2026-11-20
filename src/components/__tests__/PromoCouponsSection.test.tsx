import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PromoCouponsSection from '../PromoCouponsSection';

describe('PromoCouponsSection Component', () => {
  it('renders inclusions list and parameterized WhatsApp discount coupon links', () => {
    render(<PromoCouponsSection />);

    expect(screen.getByText('Tu Experiencia Incluye')).toBeInTheDocument();
    expect(screen.getByText('Alojamiento completo (2 días / 1 noche)')).toBeInTheDocument();
    expect(screen.getByText('Alimentación completa con chef privado')).toBeInTheDocument();

    const preventaLink = screen.getByText(/Quiero mi cupón de preventa/i).closest('a');
    expect(preventaLink).toHaveAttribute('href', expect.stringContaining('PREVENTA10'));

    const promoGrupalLink = screen
      .getByText(/Quiero mi cupón promocional para 2 o más personas/i)
      .closest('a');
    expect(promoGrupalLink).toHaveAttribute('href', expect.stringContaining('PROMO2MAS'));
  });

  it('allows customizing sectionId and retreatContext', () => {
    const { container } = render(
      <PromoCouponsSection sectionId="custom-promos" retreatContext="la Edición Delta" />
    );

    expect(container.querySelector('#custom-promos')).toBeInTheDocument();
    const preventaLink = screen.getByText(/Quiero mi cupón de preventa/i).closest('a');
    expect(preventaLink).toHaveAttribute('href', expect.stringContaining('Edici%C3%B3n%20Delta'));
  });

  it('renders without outer section wrapper when embedded is true', () => {
    const { container } = render(<PromoCouponsSection embedded sectionId="embedded-promos" />);
    expect(container.querySelector('section')).not.toBeInTheDocument();
    expect(container.querySelector('#embedded-promos')).toBeInTheDocument();
  });
});

