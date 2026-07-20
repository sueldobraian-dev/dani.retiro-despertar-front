import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RootLayout from '../layout';

// Mock de fuentes de Google para evitar errores de red e imports en JSDOM
vi.mock('next/font/google', () => {
  return {
    Inter: () => ({ variable: 'mock-sans' }),
    Playfair_Display: () => ({ variable: 'mock-serif' }),
  };
});

// Mock de los componentes hijos del layout
vi.mock('@/components/Header', () => ({
  default: () => <div data-testid="layout-header" />
}));

vi.mock('@/components/Footer', () => ({
  default: () => <div data-testid="layout-footer" />
}));

vi.mock('@/components/WhatsAppFloat', () => ({
  default: () => <div data-testid="layout-whatsapp" />
}));

describe('RootLayout Component', () => {
  it('renders html and body structure with layout widgets and children', () => {
    render(
      <RootLayout>
        <div data-testid="page-content">Contenido de Prueba</div>
      </RootLayout>
    );

    expect(screen.getByTestId('layout-header')).toBeInTheDocument();
    expect(screen.getByTestId('layout-footer')).toBeInTheDocument();
    expect(screen.getByTestId('layout-whatsapp')).toBeInTheDocument();
    expect(screen.getByTestId('page-content')).toBeInTheDocument();
    expect(screen.getByText('Contenido de Prueba')).toBeInTheDocument();
  });
});
