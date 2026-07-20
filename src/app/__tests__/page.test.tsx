import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../page';

vi.mock('@/components/HeroOverview', () => ({
  default: () => <div data-testid="hero-overview" />
}));

vi.mock('@/components/ImageCarousel', () => ({
  default: () => <div data-testid="image-carousel" />
}));

vi.mock('@/components/UpcomingRetreats', () => ({
  default: () => <div data-testid="upcoming-retreats" />
}));

vi.mock('@/components/FeedbackCarousel', () => ({
  default: () => <div data-testid="feedback-carousel" />
}));

describe('Home Page Component', () => {
  it('renders all sections on the landing page', () => {
    render(<Home />);

    expect(screen.getByTestId('hero-overview')).toBeInTheDocument();
    expect(screen.getByTestId('image-carousel')).toBeInTheDocument();
    expect(screen.getByTestId('upcoming-retreats')).toBeInTheDocument();
    expect(screen.getByTestId('feedback-carousel')).toBeInTheDocument();
  });
});
