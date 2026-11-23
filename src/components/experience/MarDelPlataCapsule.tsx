'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Sparkles,
  Utensils,
  Sun,
  Heart,
  Users,
  Instagram,
  Calendar,
  MapPin,
  X,
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import QuienesSomosCapsule from '@/components/experience/QuienesSomosCapsule';

export default function MarDelPlataCapsule() {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const consultaWhatsAppUrl = getWhatsAppUrl(
    'Hola! Quiero recibir novedades y consultar disponibilidad para la edición "REnacer, de niña a mujer" (19 al 21 de Marzo) en Acantilados, Mar del Plata.'
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Banner Principal de la Edición Mar del Plata */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/60 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-900">
                <Sun className="w-3.5 h-3.5 text-emerald-800" /> Nueva Sede • Mar del Plata
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100/80 text-amber-900">
                <Calendar className="w-3.5 h-3.5 text-amber-800" /> 19 al 21 de Marzo
              </span>
            </div>

            <div className="space-y-1">
              <span className="block text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-800">
                Edición Especial
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-800 leading-tight">
                “REnacer, de niña a mujer”
              </h2>
              <p className="text-sm sm:text-base font-medium text-stone-500 flex items-center gap-1.5 pt-1">
                <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>Acantilados, Mar del Plata (Acanti Surf Ranch)</span>
              </p>
            </div>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Tres días junto a la energía del mar y la serenidad de los Acantilados para honrar tu historia, abrazar tus etapas y reconectar con tu esencia vital en un entorno natural único.
            </p>

            {/* Detalles rápidos de la edición */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-stone-50 border border-stone-200/50 p-3 rounded-2xl">
                <span className="block text-xs font-bold text-stone-800">19 al 21 Marzo</span>
                <span className="text-[11px] text-stone-500">3 días / 2 noches</span>
              </div>
              <div className="bg-stone-50 border border-stone-200/50 p-3 rounded-2xl">
                <span className="block text-xs font-bold text-stone-800">Acantilados</span>
                <span className="text-[11px] text-stone-500">Mar del Plata</span>
              </div>
              <div className="bg-stone-50 border border-stone-200/50 p-3 rounded-2xl">
                <span className="block text-xs font-bold text-stone-800">Cocina Casera</span>
                <span className="text-[11px] text-stone-500">Base vegetariana</span>
              </div>
              <div className="bg-stone-50 border border-stone-200/50 p-3 rounded-2xl">
                <span className="block text-xs font-bold text-stone-800">Caro & Dani</span>
                <span className="text-[11px] text-stone-500">Equipo del encuentro</span>
              </div>
            </div>
          </div>

          {/* Acciones directas: Instagram del lugar y WhatsApp */}
          <div className="bg-stone-50 border border-stone-200/60 p-6 rounded-3xl flex flex-col space-y-3">
            <h4 className="font-serif font-bold text-stone-800 text-base">
              Conocé más del Espacio
            </h4>
            <p className="text-stone-500 text-xs leading-relaxed">
              Conocé más sobre nuestra sede en Acantilados a través de su Instagram o escribinos para sumarte a esta edición.
            </p>
            <a
              href="https://www.instagram.com/acanti.surfranch/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-stone-800 hover:bg-stone-900 text-stone-50 rounded-2xl text-xs font-semibold text-center transition flex items-center justify-center gap-2"
            >
              <Instagram className="w-4 h-4" /> Ver @acanti.surfranch
            </a>
            <a
              href={consultaWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-stone-50 rounded-2xl text-xs font-semibold text-center transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" /> Quiero más información
            </a>
          </div>
        </div>
      </div>

      {/* Mensaje de Espacio en Construcción y Motivación */}
      <div className="bg-gradient-to-br from-amber-50/90 via-stone-50 to-emerald-50/60 rounded-3xl p-6 sm:p-9 border border-amber-200/70 shadow-sm">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-100/80 text-amber-900 border border-amber-200/80">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Propuesta en Construcción
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-800">
            Compartimos Nuestra Motivación
          </h3>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Seguimos trabajando con mucho amor en la construcción del contenido detallado y el cronograma completo de este espacio, pero no queríamos dejar de compartir nuestra motivación y la emoción de dar vida a <strong>“REnacer, de niña a mujer”</strong> en los Acantilados de Mar del Plata.
          </p>
        </div>
      </div>

      {/* Pilares Adelantados: Propuesta Gastronómica & Acompañamiento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/60 shadow-sm space-y-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Utensils className="w-5 h-5" />
          </div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-amber-800">
            Nutrición Consciente y Adaptable
          </span>
          <h4 className="text-xl font-serif font-bold text-stone-800">
            Comida Casera con Orientación Vegetariana
          </h4>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Toda la alimentación del retiro será casera y pensada principalmente desde una base vegetariana nutritiva y amorosa. También contaremos con opciones de proteínas, adaptando los platos a las sugerencias y necesidades de quienes nos acompañen.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/60 shadow-sm space-y-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-emerald-800">
            El Propósito del Encuentro
          </span>
          <h4 className="text-xl font-serif font-bold text-stone-800">
            Un Viaje de Sanación y Autoconocimiento
          </h4>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Un espacio terapéutico y vivencial diseñado para abrazar a la niña interior y habitar la mujer que hoy somos con mayor liviandad, presencia y coherencia, sostenidas por la naturaleza costera de Acantilados.
          </p>
        </div>
      </div>

      {/* Banner / Acceso contextual para conocer al equipo de Mar del Plata (Caro & Dani) */}
      <div className="bg-emerald-950/5 border border-emerald-800/15 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-xl sm:text-2xl font-serif font-bold text-stone-800">
            Equipo de Esta Edición
          </h4>
          <p className="text-stone-600 text-xs sm:text-sm max-w-xl">
            En este encuentro en Mar del Plata estarán presentes <strong>Carolina Basualdo (Caro)</strong> y <strong>Daniela García Cabrera (Dani)</strong>, acompañando cada momento con amor y respeto.
          </p>
        </div>
        <button
          onClick={() => setIsTeamModalOpen(true)}
          className="px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-stone-50 rounded-2xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 shrink-0 cursor-pointer shadow-md shadow-emerald-950/10"
        >
          <Users className="w-4 h-4" /> Conocer Facilitadoras
        </button>
      </div>

      {/* Modal Reutilizable con QuienesSomosCapsule filtrado para Caro y Dani */}
      {isTeamModalOpen && mounted && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-end sm:justify-center bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Información del equipo en Mar del Plata"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsTeamModalOpen(false);
          }}
        >
          <div
            className="relative w-full h-[92vh] sm:h-auto sm:max-h-[85vh] sm:max-w-4xl bg-stone-50 rounded-t-[32px] sm:rounded-3xl shadow-2xl border-t sm:border border-stone-200/80 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white border-b border-stone-200 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between z-30 shrink-0 shadow-sm">
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span className="p-2 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                  <Users className="w-4 h-4" />
                </span>
                <h3 className="font-serif font-bold text-stone-800 text-base sm:text-lg truncate">
                  Equipo • Edición Mar del Plata
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

            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-8 space-y-6">
              <QuienesSomosCapsule memberIds={['caro', 'dani']} />
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
