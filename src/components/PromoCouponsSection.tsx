'use client';

import React from 'react';
import { CheckCircle2, Tag, Ticket, MessageSquare } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export interface PromoCouponsSectionProps {
  sectionId?: string;
  retreatContext?: string;
  embedded?: boolean;
}

const DEFAULT_INCLUDES = [
  'Alojamiento completo (2 días / 1 noche)',
  'Todas las actividades (Constelaciones con caballos, Yoga, Reiki)',
  'Alimentación completa con chef privado',
  'Acompañamiento cercano durante todo el retiro',
];

export default function PromoCouponsSection({
  sectionId = 'beneficios',
  retreatContext = 'el Retiro Despertar en Finca Los Coipos',
  embedded = false,
}: PromoCouponsSectionProps) {
  const preventaWhatsAppUrl = getWhatsAppUrl(
    `Hola! Quisiera solicitar mi cupón de preventa (-10% OFF) para ${retreatContext}. Código: PREVENTA10`
  );

  const promoGrupalWhatsAppUrl = getWhatsAppUrl(
    `Hola! Quisiera solicitar mi cupón promocional para 2 o más personas (-20% OFF) para ${retreatContext}. Código: PROMO2MAS`
  );

  const cardContent = (
    <div
      id={embedded ? sectionId : undefined}
      className="bg-gradient-to-br from-emerald-900 to-stone-900 text-stone-50 rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">
            Propuesta Integral
          </span>
          <h2 className="text-3xl font-serif font-bold">
            Tu Experiencia Incluye
          </h2>
          <ul className="space-y-3 text-stone-200 text-xs sm:text-sm pt-2">
            {DEFAULT_INCLUDES.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-stone-400 pt-2">
            * No incluye traslado (entrada a 25mts de Ruta 2, km 134.5). Se reserva lugar con seña del 20%.
          </p>
        </div>

        {/* Botones de Cupones Parametrizados a WhatsApp */}
        <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20 space-y-4">
          <div className="space-y-1">
            <span className="text-xs text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Beneficios Exclusivos
            </span>
            <h3 className="text-xl font-serif font-bold text-white">
              Solicitá tu Cupón de Descuento
            </h3>
            <p className="text-xs text-stone-300">
              Escribinos directamente por WhatsApp con el código parametrizado para acceder al beneficio.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <a
              href={preventaWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-stone-50 rounded-2xl font-semibold text-xs sm:text-sm transition flex items-center justify-between shadow-md cursor-pointer group"
            >
              <span className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-amber-300" />
                <span>Quiero mi cupón de preventa (-10% OFF)</span>
              </span>
              <MessageSquare className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
            </a>

            <a
              href={promoGrupalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-emerald-800/80 hover:bg-emerald-700 text-stone-50 border border-emerald-400/30 rounded-2xl font-semibold text-xs sm:text-sm transition flex items-center justify-between shadow-md cursor-pointer group"
            >
              <span className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-amber-300" />
                <span>Quiero mi cupón promocional para 2 o más personas (-20% OFF)</span>
              </span>
              <MessageSquare className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return cardContent;
  }

  return (
    <section id={sectionId} className="py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {cardContent}
      </div>
    </section>
  );
}

