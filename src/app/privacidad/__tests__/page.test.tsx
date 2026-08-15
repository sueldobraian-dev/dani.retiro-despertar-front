import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PrivacidadPage from '../page';

describe('PrivacidadPage Component', () => {
  it('renders privacy policy heading and sections', () => {
    render(<PrivacidadPage />);

    expect(screen.getByRole('heading', { level: 1, name: /Política de Privacidad/i })).toBeInTheDocument();
    expect(screen.getByText(/Compromiso de Privacidad/i)).toBeInTheDocument();
    expect(screen.getByText(/Información que Recopilamos/i)).toBeInTheDocument();
    expect(screen.getByText(/Protección de Datos y Servicios de Terceros/i)).toBeInTheDocument();
  });
});
