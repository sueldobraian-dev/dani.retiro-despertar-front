import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import DespertarIcon from '../DespertarIcon';

describe('DespertarIcon Component', () => {
  it('renders SVG with default props', () => {
    const { container } = render(<DespertarIcon />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  it('accepts custom className and size props', () => {
    const { container } = render(<DespertarIcon className="custom-class" size={32} />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveClass('custom-class');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });
});
