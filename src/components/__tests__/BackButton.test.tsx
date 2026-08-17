import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BackButton from '../BackButton';

const mockBack = vi.fn();
const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
    push: mockPush,
  }),
}));

describe('BackButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders button with label and calls router.back() when history length > 1', () => {
    Object.defineProperty(window, 'history', {
      value: { length: 2 },
      writable: true,
    });

    render(<BackButton label="Volver" />);

    const button = screen.getByRole('button', { name: /Volver/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it('calls router.push(fallbackUrl) when history length is 1 or less', () => {
    Object.defineProperty(window, 'history', {
      value: { length: 1 },
      writable: true,
    });

    render(<BackButton label="Volver" fallbackUrl="/experiencia" />);

    const button = screen.getByRole('button', { name: /Volver/i });
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/experiencia');
  });
});
