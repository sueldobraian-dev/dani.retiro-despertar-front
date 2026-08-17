'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Waves } from 'lucide-react';
import { getGalleryUrl } from '@/lib/locationUrls';

export default function DeltaCapsule() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/60 shadow-sm text-center space-y-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900">
          <Waves className="w-3.5 h-3.5" /> Edición Delta
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-800">
          Complejo Minahasa – Tigre (Delta)
        </h2>
        <p className="text-stone-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Una experiencia inmersiva entre arroyos y la exuberante vegetación del Delta del Paraná. Acceso exclusivo mediante lancha colectiva "Línea Interisleña" desde la Estación Fluvial de Tigre (Muelle 1).
        </p>

        <div className="inline-block p-4 bg-amber-50 border border-amber-200/60 rounded-2xl text-amber-900 text-xs sm:text-sm font-semibold">
          Próximamente estaremos anunciando la fecha oficial para la edición en el Delta.
        </div>

        <div className="pt-4 flex justify-center">
          <Link
            href={getGalleryUrl('retiro-despertar/tigre-delta-minahasa')}
            className="px-6 py-3.5 bg-stone-800 hover:bg-stone-900 text-stone-50 rounded-2xl text-xs font-semibold transition flex items-center gap-2"
          >
            <Camera className="w-4 h-4" /> Explorar Galería del Delta
          </Link>
        </div>
      </div>
    </div>
  );
}
