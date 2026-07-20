import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import GaleriaPage from '../page';

vi.mock('@/components/MediaGallery', () => ({
  default: () => <div data-testid="media-gallery" />
}));

describe('Galeria Page Component', () => {
  it('renders MediaGallery component', () => {
    render(<GaleriaPage />);

    expect(screen.getByTestId('media-gallery')).toBeInTheDocument();
  });
});
