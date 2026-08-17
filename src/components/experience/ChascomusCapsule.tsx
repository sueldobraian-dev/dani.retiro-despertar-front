'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Utensils,
  Sun,
  CheckCircle2,
  Camera,
  Heart,
  Tag,
  Ticket,
  MessageSquare,
  FileText,
  ChevronRight
} from 'lucide-react';
import { getGalleryUrl } from '@/lib/locationUrls';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export default function ChascomusCapsule() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  const preventaWhatsAppUrl = getWhatsAppUrl(
    'Hola! Quisiera solicitar mi cupón de preventa (-10% OFF) para el Retiro Despertar en Finca Los Coipos. Código: PREVENTA10'
  );

  const promoGrupalWhatsAppUrl = getWhatsAppUrl(
    'Hola! Quisiera solicitar mi cupón promocional para 2 o más personas (-20% OFF) para el Retiro Despertar en Finca Los Coipos. Código: PROMO2MAS'
  );

  const reservaWhatsAppUrl = getWhatsAppUrl(
    'Hola! Quiero consultar disponibilidad y reservar mi lugar para el Retiro Despertar en Finca Los Coipos.'
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Banner de Ubicación y Resumen */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/60 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-900">
                Próxima Edición
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100/80 text-amber-900">
                31 de Octubre & 1 de Noviembre
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-800">
              Finca Los Coipos – Chascomús
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Un entorno natural, contenido y silencioso de 11 hectáreas con salida privada a la laguna. Un regalo para frenar, dejar de hacer y empezar a sentir.
            </p>
            
            {/* Detalles rápidos de las instalaciones */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-stone-50 border border-stone-200/50 p-3 rounded-2xl">
                <span className="block text-xs font-bold text-stone-800">11 Hectáreas</span>
                <span className="text-[11px] text-stone-500">Pura naturaleza</span>
              </div>
              <div className="bg-stone-50 border border-stone-200/50 p-3 rounded-2xl">
                <span className="block text-xs font-bold text-stone-800">Laguna Privada</span>
                <span className="text-[11px] text-stone-500">Salida exclusiva</span>
              </div>
              <div className="bg-stone-50 border border-stone-200/50 p-3 rounded-2xl">
                <span className="block text-xs font-bold text-stone-800">Cupos Limitados</span>
                <span className="text-[11px] text-stone-500">Máximo 9 personas</span>
              </div>
            </div>
          </div>

          {/* Acciones directas de la ubicación */}
          <div className="bg-stone-50 border border-stone-200/60 p-6 rounded-3xl flex flex-col space-y-3">
            <h4 className="font-serif font-bold text-stone-800 text-base">
              Galería & Consultas
            </h4>
            <p className="text-stone-500 text-xs leading-relaxed">
              Conoce el espacio en fotos y solicita tu cupón de reserva directa por WhatsApp.
            </p>
            <Link
              href={getGalleryUrl('retiro-despertar/chascomus-finca-los-coipos')}
              className="w-full py-3 bg-stone-800 hover:bg-stone-900 text-stone-50 rounded-2xl text-xs font-semibold text-center transition flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" /> Ver Galería de Fotos
            </Link>
            <a
              href={reservaWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-stone-50 rounded-2xl text-xs font-semibold text-center transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Reservar mi Lugar
            </a>
          </div>
        </div>
      </div>

      {/* ¿Qué vamos a vivir? (Actividades) */}
      <div>
        <h3 className="text-2xl font-serif font-bold text-stone-800 mb-6 text-center">
          ¿Qué vamos a vivir en Chascomús?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200/60 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-stone-800 text-base">
              Constelaciones con Caballos
            </h4>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Trabajo sistémico en libertad con caballos para ordenar vínculos, comprender dinámicas inconscientes y soltar patrones heredados.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200/60 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sun className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-stone-800 text-base">
              Hatha Yoga Consciente
            </h4>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Movimiento suave para liberar tensiones corporales, habitar el cuerpo y reconectar con tu respiración natural.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200/60 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-stone-800 text-base">
              Reiki Grupal
            </h4>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Armonización energética colectiva para calmar la mente y restaurar el flujo vital en un ambiente contenedor.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200/60 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Utensils className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-stone-800 text-base">
              Chef Privado
            </h4>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Alimentación saludable y consciente preparada especialmente durante todo el fin de semana para acompañar tu proceso.
            </p>
          </div>
        </div>
      </div>

      {/* Cronograma / Programa del Retiro */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/60 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-stone-100 pb-6">
          <div>
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              Paso a paso
            </span>
            <h3 className="text-2xl font-serif font-bold text-stone-800">
              Programa del Retiro
            </h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveDay(1)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                activeDay === 1
                  ? 'bg-emerald-800 text-stone-50'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Día 1 (Sábado)
            </button>
            <button
              onClick={() => setActiveDay(2)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                activeDay === 2
                  ? 'bg-emerald-800 text-stone-50'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Día 2 (Domingo)
            </button>
          </div>
        </div>

        {activeDay === 1 ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-100">
              <span className="font-serif font-bold text-emerald-800 text-sm w-16">09:30</span>
              <span className="text-stone-700 text-xs sm:text-sm">Llegada y reparto de habitaciones</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-100">
              <span className="font-serif font-bold text-emerald-800 text-sm w-16">10:00</span>
              <span className="text-stone-700 text-xs sm:text-sm">Presentación y toma de conciencia</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-100">
              <span className="font-serif font-bold text-emerald-800 text-sm w-16">10:30</span>
              <span className="text-stone-700 text-xs sm:text-sm">Infusiones y bienvenida</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100">
              <span className="font-serif font-bold text-emerald-800 text-sm w-16">11:00</span>
              <span className="text-stone-800 font-medium text-xs sm:text-sm">Constelaciones Familiares con Caballos (Bloque 1)</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-100">
              <span className="font-serif font-bold text-emerald-800 text-sm w-16">13:30</span>
              <span className="text-stone-700 text-xs sm:text-sm">Comida preparada por chef privado</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100">
              <span className="font-serif font-bold text-emerald-800 text-sm w-16">14:30</span>
              <span className="text-stone-800 font-medium text-xs sm:text-sm">Constelaciones Familiares con Caballos (Bloque 2)</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-100">
              <span className="font-serif font-bold text-emerald-800 text-sm w-16">18:30</span>
              <span className="text-stone-700 text-xs sm:text-sm">Snack / Refrigerio en la naturaleza</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-100">
              <span className="font-serif font-bold text-emerald-800 text-sm w-16">21:00</span>
              <span className="text-stone-700 text-xs sm:text-sm">Cena / Fogón de integración</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100">
              <span className="font-serif font-bold text-emerald-800 text-sm w-16">08:00</span>
              <span className="text-stone-800 font-medium text-xs sm:text-sm">Hatha Yoga matutino</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-100">
              <span className="font-serif font-bold text-emerald-800 text-sm w-16">10:00</span>
              <span className="text-stone-700 text-xs sm:text-sm">Desayuno / Comida nutritiva</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100">
              <span className="font-serif font-bold text-emerald-800 text-sm w-16">11:30</span>
              <span className="text-stone-800 font-medium text-xs sm:text-sm">Sesión de Reiki Grupal</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-100">
              <span className="font-serif font-bold text-emerald-800 text-sm w-16">13:00</span>
              <span className="text-stone-700 text-xs sm:text-sm">Almuerzo especial del chef</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-100">
              <span className="font-serif font-bold text-emerald-800 text-sm w-16">14:30</span>
              <span className="text-stone-700 text-xs sm:text-sm">Tiempo libre y descanso junto a la laguna</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-100">
              <span className="font-serif font-bold text-emerald-800 text-sm w-16">16:30</span>
              <span className="text-stone-700 text-xs sm:text-sm">Snack / Infusiones</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-amber-50/60 rounded-2xl border border-amber-100">
              <span className="font-serif font-bold text-amber-900 text-sm w-16">17:00</span>
              <span className="text-stone-800 font-semibold text-xs sm:text-sm">Círculo de Cierre y Despedida</span>
            </div>
          </div>
        )}
      </div>

      {/* Inversión e Inclusiones con Botones Parametrizados de Cupones por WhatsApp */}
      <div className="bg-gradient-to-br from-emerald-900 to-stone-900 text-stone-50 rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">
              Propuesta Integral
            </span>
            <h3 className="text-3xl font-serif font-bold">
              Tu Experiencia Incluye
            </h3>
            <ul className="space-y-3 text-stone-200 text-xs sm:text-sm pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Alojamiento completo (2 días / 1 noche)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Todas las actividades (Constelaciones con caballos, Yoga, Reiki)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Alimentación completa con chef privado</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Acompañamiento cercano durante todo el retiro</span>
              </li>
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
              <h4 className="text-xl font-serif font-bold text-white">
                Solicitá tu Cupón de Descuento
              </h4>
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

      {/* Términos y Condiciones Enlace a /terminos */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/60 shadow-sm hover:shadow-md transition-shadow">
        <Link
          href="/terminos"
          className="w-full flex items-center justify-between font-serif font-bold text-stone-800 text-lg hover:text-emerald-800 transition-colors group"
        >
          <span className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-emerald-800" />
            <span>Términos y Condiciones de Reserva</span>
          </span>
          <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-emerald-800 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  );
}
