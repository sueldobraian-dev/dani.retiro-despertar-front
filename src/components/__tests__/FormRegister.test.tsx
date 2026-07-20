import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormRegister from '../FormRegister';

const mockInsert = vi.fn();

vi.mock('@/lib/supabase', () => {
  return {
    supabase: {
      from: vi.fn(() => ({
        insert: mockInsert,
      })),
    },
  };
});

describe('FormRegister Component', () => {
  beforeEach(() => {
    mockInsert.mockReset();
    vi.stubGlobal('fetch', vi.fn());
  });

  it('renders all form inputs and submit button', () => {
    render(<FormRegister />);

    expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/WhatsApp \/ Teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Disciplina de Interés/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Comentarios o Intenciones/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Confirmar Pre-Inscripción/i })).toBeInTheDocument();
  });

  it('shows success screen and resets form fields on successful submission', async () => {
    mockInsert.mockResolvedValueOnce({ error: null });

    render(<FormRegister />);

    // Rellenar campos obligatorios
    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), { target: { value: 'Juan Perez' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'juan@email.com' } });
    fireEvent.change(screen.getByLabelText(/WhatsApp \/ Teléfono/i), { target: { value: '+5491112345678' } });

    // Enviar el formulario
    fireEvent.click(screen.getByRole('button', { name: /Confirmar Pre-Inscripción/i }));

    // Esperar a que se muestre el estado de éxito
    await waitFor(() => {
      expect(screen.getByText(/¡Inscripción Recibida!/i)).toBeInTheDocument();
    });

    expect(mockInsert).toHaveBeenCalledWith([
      {
        full_name: 'Juan Perez',
        email: 'juan@email.com',
        phone: '+5491112345678',
        interest_discipline: 'Todas',
        message: null,
      }
    ]);
  });

  it('triggers Supabase auto-restore recovery endpoint on connection failure', async () => {
    mockInsert.mockResolvedValueOnce({ error: new Error('Database is paused') });
    const fetchMock = vi.fn().mockResolvedValueOnce({ ok: true });
    vi.stubGlobal('fetch', fetchMock);

    render(<FormRegister />);

    // Rellenar campos obligatorios
    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), { target: { value: 'Juan Perez' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'juan@email.com' } });
    fireEvent.change(screen.getByLabelText(/WhatsApp \/ Teléfono/i), { target: { value: '+5491112345678' } });

    // Enviar el formulario
    fireEvent.click(screen.getByRole('button', { name: /Confirmar Pre-Inscripción/i }));

    // Esperar a que aparezca el banner de error/restore
    await waitFor(() => {
      expect(screen.getByText(/Hubo un problema al enviar la pre-inscripción/i)).toBeInTheDocument();
    });

    // Validar que se llamó al endpoint para despertar la DB
    expect(fetchMock).toHaveBeenCalledWith('/api/supabase/restore', { method: 'POST' });
  });
});
