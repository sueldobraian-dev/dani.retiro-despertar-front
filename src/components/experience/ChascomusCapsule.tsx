'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  ChevronRight,
  Users,
  X
} from 'lucide-react';
import { getGalleryUrl } from '@/lib/locationUrls';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import ExperienceLocationCarousel from '@/components/experience/ExperienceLocationCarousel';
import QuienesSomosCapsule from '@/components/experience/QuienesSomosCapsule';

export default function ChascomusCapsule() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cerrar modal con tecla Escape y bloquear scroll de fondo
  useEffect(() => {
    if (!isTeamModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsTeamModalOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTeamModalOpen]);

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

      {/* Banner / Acceso contextual para conocer al equipo */}
      <div className="bg-emerald-950/5 border border-emerald-800/15 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-xl sm:text-2xl font-serif font-bold text-stone-800">
            Conocé Nuestro Equipo
          </h4>
          <p className="text-stone-600 text-xs sm:text-sm max-w-xl">
            Te presentamos a Verónica, Nancy y Daniela: las facilitadoras de las actividades que sostienen este espacio de sanación.
          </p>
        </div>
        <button
          onClick={() => setIsTeamModalOpen(true)}
          className="px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-stone-50 rounded-2xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 shrink-0 cursor-pointer shadow-md shadow-emerald-950/10"
        >
          <Users className="w-4 h-4" /> Conocer Facilitadoras
        </button>
      </div>

      {/* Carrusel de Fotos de Finca Los Coipos (Cloudinary tag: finca-los-coipos con experience-order) */}
      <ExperienceLocationCarousel
        tag="finca-los-coipos"
        title="Postales de Finca Los Coipos"
        subtitle="Un vistazo a los rincones, laguna y naturaleza de nuestra sede en Chascomús"
      />

      {/* Cronograma / Programa del Retiro */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/60 shadow-sm">
        <div className="space-y-4 mb-6 border-b border-stone-100 pb-5">
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
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${activeDay === 1
                ? 'bg-emerald-800 text-stone-50 shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
            >
              Día 1 (Sábado)
            </button>
            <button
              onClick={() => setActiveDay(2)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${activeDay === 2
                ? 'bg-emerald-800 text-stone-50 shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
            >
              Día 2 (Domingo)
            </button>
          </div>
        </div>

        {activeDay === 1 ? (
          <div className="divide-y divide-stone-100">
            <div className="flex items-center gap-4 py-2.5 text-xs sm:text-sm">
              <span className="font-serif font-bold text-emerald-800 w-14 shrink-0">09:30</span>
              <span className="text-stone-700">Llegada y reparto de habitaciones</span>
            </div>
            <div className="flex items-center gap-4 py-2.5 text-xs sm:text-sm">
              <span className="font-serif font-bold text-emerald-800 w-14 shrink-0">10:00</span>
              <span className="text-stone-700">Presentación y toma de conciencia</span>
            </div>
            <div className="flex items-center gap-4 py-2.5 text-xs sm:text-sm">
              <span className="font-serif font-bold text-emerald-800 w-14 shrink-0">10:30</span>
              <span className="text-stone-700">Infusiones y bienvenida</span>
            </div>
            <div className="flex items-center gap-4 py-2.5 text-xs sm:text-sm bg-emerald-50/50 -mx-3 px-3 rounded-lg">
              <span className="font-serif font-bold text-emerald-800 w-14 shrink-0">11:00</span>
              <span className="text-stone-800 font-medium">Constelaciones Familiares con Caballos (Bloque 1)</span>
            </div>
            <div className="flex items-center gap-4 py-2.5 text-xs sm:text-sm">
              <span className="font-serif font-bold text-emerald-800 w-14 shrink-0">13:30</span>
              <span className="text-stone-700">Comida preparada por chef privado</span>
            </div>
            <div className="flex items-center gap-4 py-2.5 text-xs sm:text-sm bg-emerald-50/50 -mx-3 px-3 rounded-lg">
              <span className="font-serif font-bold text-emerald-800 w-14 shrink-0">14:30</span>
              <span className="text-stone-800 font-medium">Constelaciones Familiares con Caballos (Bloque 2)</span>
            </div>
            <div className="flex items-center gap-4 py-2.5 text-xs sm:text-sm">
              <span className="font-serif font-bold text-emerald-800 w-14 shrink-0">18:30</span>
              <span className="text-stone-700">Snack / Refrigerio en la naturaleza</span>
            </div>
            <div className="flex items-center gap-4 py-2.5 text-xs sm:text-sm">
              <span className="font-serif font-bold text-emerald-800 w-14 shrink-0">21:00</span>
              <span className="text-stone-700">Cena / Fogón de integración</span>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            <div className="flex items-center gap-4 py-2.5 text-xs sm:text-sm bg-emerald-50/50 -mx-3 px-3 rounded-lg">
              <span className="font-serif font-bold text-emerald-800 w-14 shrink-0">08:00</span>
              <span className="text-stone-800 font-medium">Hatha Yoga matutino</span>
            </div>
            <div className="flex items-center gap-4 py-2.5 text-xs sm:text-sm">
              <span className="font-serif font-bold text-emerald-800 w-14 shrink-0">10:00</span>
              <span className="text-stone-700">Desayuno / Comida nutritiva</span>
            </div>
            <div className="flex items-center gap-4 py-2.5 text-xs sm:text-sm bg-emerald-50/50 -mx-3 px-3 rounded-lg">
              <span className="font-serif font-bold text-emerald-800 w-14 shrink-0">11:30</span>
              <span className="text-stone-800 font-medium">Sesión de Reiki Grupal</span>
            </div>
            <div className="flex items-center gap-4 py-2.5 text-xs sm:text-sm">
              <span className="font-serif font-bold text-emerald-800 w-14 shrink-0">13:00</span>
              <span className="text-stone-700">Almuerzo especial del chef</span>
            </div>
            <div className="flex items-center gap-4 py-2.5 text-xs sm:text-sm">
              <span className="font-serif font-bold text-emerald-800 w-14 shrink-0">14:30</span>
              <span className="text-stone-700">Tiempo libre y descanso junto a la laguna</span>
            </div>
            <div className="flex items-center gap-4 py-2.5 text-xs sm:text-sm">
              <span className="font-serif font-bold text-emerald-800 w-14 shrink-0">16:30</span>
              <span className="text-stone-700">Snack / Infusiones</span>
            </div>
            <div className="flex items-center gap-4 py-2.5 text-xs sm:text-sm bg-amber-50/60 -mx-3 px-3 rounded-lg">
              <span className="font-serif font-bold text-amber-900 w-14 shrink-0">17:00</span>
              <span className="text-stone-800 font-semibold">Círculo de Cierre y Despedida</span>
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

      {/* Modal Reutilizable con QuienesSomosCapsule montado via createPortal */}
      {isTeamModalOpen && mounted && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-end sm:justify-center bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Información del equipo y facilitadoras"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsTeamModalOpen(false);
          }}
        >
          <div
            className="relative w-full h-[92vh] sm:h-auto sm:max-h-[85vh] sm:max-w-4xl bg-stone-50 rounded-t-[32px] sm:rounded-3xl shadow-2xl border-t sm:border border-stone-200/80 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal visible siempre en la parte superior */}
            <div className="bg-white border-b border-stone-200 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between z-30 shrink-0 shadow-sm">
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span className="p-2 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                  <Users className="w-4 h-4" />
                </span>
                <h3 className="font-serif font-bold text-stone-800 text-base sm:text-lg truncate">
                  Quiénes Somos • Equipo Despertar
                </h3>
              </div>
              <button
                onClick={() => setIsTeamModalOpen(false)}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-stone-800 rounded-full text-xs font-bold flex items-center gap-1.5 border border-stone-300 transition cursor-pointer shadow-sm shrink-0"
                aria-label="Cerrar modal"
              >
                <span>Cerrar</span>
                <X className="w-4 h-4 text-stone-900" />
              </button>
            </div>

            {/* Contenido del Modal con scroll independiente */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-8 space-y-6">
              <QuienesSomosCapsule />
              {/* Botón inferior para cerrar cómodamente */}
              <div className="pt-6 pb-8 border-t border-stone-200 text-center">
                <button
                  onClick={() => setIsTeamModalOpen(false)}
                  className="px-6 py-3 bg-stone-800 hover:bg-stone-900 text-white rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer shadow-md"
                >
                  Cerrar y Volver a la Experiencia
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
