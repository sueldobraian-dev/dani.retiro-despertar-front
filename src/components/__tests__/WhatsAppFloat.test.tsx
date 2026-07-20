import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import WhatsAppFloat from '../WhatsAppFloat';

describe('WhatsAppFloat Component', () => {
  it('toggles minimize state and responds to open-whatsapp window events', () => {
    render(<WhatsAppFloat />);

    // Por defecto se renderiza maximizado
    expect(screen.getByText('¡Hola! ¿Tienes dudas sobre el próximo Retiro Despertar? Escríbenos y te acompañamos.')).toBeInTheDocument();

    // Minimizar
    const minimizeBtn = screen.getByTitle('Minimizar');
    fireEvent.click(minimizeBtn);

    // Debe mostrar el botón flotante circular
    expect(screen.queryByText('¡Hola! ¿Tienes dudas sobre el próximo Retiro Despertar? Escríbenos y te acompañamos.')).not.toBeInTheDocument();
    const floatingBtn = screen.getByTitle('Escríbenos por WhatsApp');
    expect(floatingBtn).toBeInTheDocument();

    // Disparar evento global para abrir
    act(() => {
      window.dispatchEvent(new CustomEvent('open-whatsapp'));
    });

    // Debe maximizarse nuevamente
    expect(screen.getByText('¡Hola! ¿Tienes dudas sobre el próximo Retiro Despertar? Escríbenos y te acompañamos.')).toBeInTheDocument();
  });
});
