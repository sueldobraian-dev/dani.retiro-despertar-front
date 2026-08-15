import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import WhatsAppFloat from '../WhatsAppFloat';

describe('WhatsAppFloat Component', () => {
  it('starts minimized by default and responds to click and open-whatsapp events', () => {
    render(<WhatsAppFloat />);

    // Por defecto se renderiza minimizado (botón flotante circular)
    const floatingBtn = screen.getByTitle('Escríbenos por WhatsApp');
    expect(floatingBtn).toBeInTheDocument();
    expect(screen.queryByText('¡Hola! ¿Tienes dudas sobre el próximo Retiro Despertar? Escríbenos y te acompañamos.')).not.toBeInTheDocument();

    // Abrir al hacer click en el botón flotante
    fireEvent.click(floatingBtn);
    expect(screen.getByText('¡Hola! ¿Tienes dudas sobre el próximo Retiro Despertar? Escríbenos y te acompañamos.')).toBeInTheDocument();

    // Minimizar
    const minimizeBtn = screen.getByTitle('Minimizar');
    fireEvent.click(minimizeBtn);
    expect(screen.queryByText('¡Hola! ¿Tienes dudas sobre el próximo Retiro Despertar? Escríbenos y te acompañamos.')).not.toBeInTheDocument();

    // Disparar evento global para abrir
    act(() => {
      window.dispatchEvent(new CustomEvent('open-whatsapp'));
    });

    // Debe maximizarse nuevamente
    expect(screen.getByText('¡Hola! ¿Tienes dudas sobre el próximo Retiro Despertar? Escríbenos y te acompañamos.')).toBeInTheDocument();
  });
});
