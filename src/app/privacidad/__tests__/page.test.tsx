import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PrivacidadPage from '../page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: vi.fn(),
    push: vi.fn(),
  }),
}));

describe('PrivacidadPage Component', () => {
  it('renders privacy policy heading and sections', () => {
    render(<PrivacidadPage />);

    expect(screen.getByRole('heading', { level: 1, name: /Política de Privacidad/i })).toBeInTheDocument();
    expect(screen.getByText(/Compromiso de Privacidad/i)).toBeInTheDocument();
    expect(screen.getByText(/Información que Recopilamos/i)).toBeInTheDocument();
    expect(screen.getByText(/Finalidad del Uso de los Datos/i)).toBeInTheDocument();
    expect(screen.getByText(/No Divulgación a Terceros/i)).toBeInTheDocument();
  });
});
