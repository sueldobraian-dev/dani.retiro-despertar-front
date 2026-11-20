import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestimoniosPage from '../page';

vi.mock('@/components/FeedbackCarousel', () => ({
  default: () => <div data-testid="feedback-carousel" />,
}));

describe('Testimonios Page Component', () => {
  it('renders FeedbackCarousel in its own dedicated page', () => {
    render(<TestimoniosPage />);
    expect(screen.getByTestId('feedback-carousel')).toBeInTheDocument();
  });
});

