import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GalleryError from '../error';

// Mock next/link
vi.mock('next/link', () => {
  return {
    default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
  };
});

describe('GalleryError Component', () => {
  const originalEnv = process.env.NEXT_PUBLIC_SHOW_DETAILED_ERRORS;
  const mockError = new Error('Test connection failure');
  const mockReset = vi.fn();

  beforeEach(() => {
    mockReset.mockReset();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_SHOW_DETAILED_ERRORS = originalEnv;
    vi.restoreAllMocks();
  });

  it('renders client-friendly maintenance screen when detailed errors are disabled', () => {
    process.env.NEXT_PUBLIC_SHOW_DETAILED_ERRORS = 'false';

    render(<GalleryError error={mockError} reset={mockReset} />);

    expect(screen.getByText('Galería en Mantenimiento')).toBeInTheDocument();
    expect(screen.getByText(/Estamos teniendo dificultades para conectar con el servidor/i)).toBeInTheDocument();

    const retryBtn = screen.getByRole('button', { name: /Intentar Nuevamente/i });
    fireEvent.click(retryBtn);

    expect(mockReset).toHaveBeenCalled();
  });

  it('renders detailed error trace screen when detailed errors are enabled', () => {
    process.env.NEXT_PUBLIC_SHOW_DETAILED_ERRORS = 'true';

    render(<GalleryError error={mockError} reset={mockReset} />);

    expect(screen.getByText('Modo Desarrollo Activo')).toBeInTheDocument();
    expect(screen.getByText('Error Detectado en Galería')).toBeInTheDocument();
    expect(screen.getByText('Test connection failure')).toBeInTheDocument();

    const developerRetryBtn = screen.getByRole('button', { name: /Reintentar Renderizado/i });
    fireEvent.click(developerRetryBtn);

    expect(mockReset).toHaveBeenCalled();
  });
});
