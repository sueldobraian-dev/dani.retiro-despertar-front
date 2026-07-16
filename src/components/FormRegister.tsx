'use client';

import React, { useState } from 'react';
import { FormRegisterInput } from '@/types';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function FormRegister() {
  const [formData, setFormData] = useState<FormRegisterInput>({
    fullName: '',
    email: '',
    phone: '',
    interestDiscipline: 'Todas',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const { error } = await supabase
        .from('registrations')
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            interest_discipline: formData.interestDiscipline,
            message: formData.message || null,
          },
        ]);

      if (error) {
        throw error;
      }

      setStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        interestDiscipline: 'Todas',
        message: '',
      });
    } catch (err) {
      console.error('Error recording registration:', err);
      
      // Intentar reactivar Supabase si la llamada falló (posible base de datos pausada)
      try {
        await fetch('/api/supabase/restore', { method: 'POST' });
      } catch (restoreErr) {
        console.error('Error trying to restore Supabase:', restoreErr);
      }

      setStatus('error');
    }
  };

  return (
    <section id="inscripcion" className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-50 rounded-3xl p-8 md:p-12 border border-stone-100 shadow-xl shadow-stone-200/40 relative overflow-hidden">
          {/* Fondos degradados decorativos sutiles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-60 -mr-10 -mt-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl opacity-60 -ml-10 -mb-10 pointer-events-none" />

          <div className="text-center max-w-xl mx-auto mb-8 relative z-10">
            <span className="text-emerald-800 font-semibold tracking-wider uppercase text-sm flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> Reserva tu Lugar
            </span>
            <h2 className="text-3xl font-serif text-stone-800 mt-2">
              Comienza tu Camino
            </h2>
            <p className="text-stone-600 mt-2 text-sm sm:text-base">
              Completa el formulario y nos contactaremos para brindarte todos los detalles e iniciar tu proceso de reserva.
            </p>
          </div>

          {status === 'success' ? (
            <div className="text-center py-12 flex flex-col items-center space-y-4 relative z-10">
              <CheckCircle2 className="w-16 h-16 text-emerald-700 animate-bounce" />
              <h3 className="text-2xl font-serif text-stone-800">
                ¡Inscripción Recibida!
              </h3>
              <p className="text-stone-600 max-w-md">
                Gracias por dar este paso hacia tu bienestar. En breve nos pondremos en contacto contigo vía WhatsApp o Correo para coordinar el pago y confirmar tu cupo.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm text-emerald-800 hover:text-emerald-950 underline font-semibold transition"
              >
                Registrar otra inscripción
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Nombre */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium text-stone-700">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-white transition duration-300 placeholder:text-stone-400 text-stone-800"
                    placeholder="Ej. Carolina Gómez"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-stone-700">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-white transition duration-300 placeholder:text-stone-400 text-stone-800"
                    placeholder="ejemplo@correo.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Teléfono */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-stone-700">
                    WhatsApp / Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-white transition duration-300 placeholder:text-stone-400 text-stone-800"
                    placeholder="Ej. +54 9 11 1234-5678"
                  />
                </div>

                {/* Disciplina */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="interestDiscipline" className="text-sm font-medium text-stone-700">
                    Disciplina de Interés
                  </label>
                  <select
                    id="interestDiscipline"
                    name="interestDiscipline"
                    value={formData.interestDiscipline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-white transition duration-300 text-stone-800"
                  >
                    <option value="Todas">Todas (Yoga, Reiki y Constelaciones)</option>
                    <option value="Constelaciones Familiares">Constelaciones Familiares</option>
                    <option value="Reiki">Reiki</option>
                    <option value="Yoga">Yoga</option>
                  </select>
                </div>
              </div>

              {/* Mensaje */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-stone-700">
                  Comentarios o Intenciones (Opcional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-white transition duration-300 placeholder:text-stone-400 text-stone-800 resize-none"
                  placeholder="Cuéntanos si tienes alguna intención o necesidad específica..."
                />
              </div>

              {status === 'error' && (
                <div className="p-4 bg-amber-50 border border-amber-200 text-stone-700 text-sm rounded-2xl">
                  Hubo un problema al enviar la pre-inscripción. Si la base de datos estaba inactiva, la estamos reactivando automáticamente. Por favor, aguarda unos segundos e intenta confirmar de nuevo.
                </div>
              )}

              {/* Botón de Enviar */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-600/70 text-stone-50 rounded-full font-semibold transition duration-300 ease-in-out shadow-md shadow-emerald-900/10 hover:shadow-emerald-900/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Confirmar Pre-Inscripción'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
