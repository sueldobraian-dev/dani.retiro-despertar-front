'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, ShieldCheck, Sparkles } from 'lucide-react';

export default function QuienesSomosCapsule() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Manifestación / Filosofía */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/60 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-emerald-800 font-semibold uppercase text-xs tracking-wider">
            Nuestra Esencia
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-stone-800 font-bold leading-snug">
            Una pausa para quienes están cansad@s de sostenerlo todo
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-normal">
            Despertar es un espacio seguro para frenar, sentir y soltar cargas. A través de experiencias corporales y emocionales profundas, el retiro acompaña un proceso de reconexión interna para volver a tu vida con más liviandad, claridad y coherencia con tu deseo.
          </p>
          <div className="pt-4 border-t border-stone-100 flex flex-wrap justify-center gap-6 text-xs sm:text-sm text-stone-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-emerald-700" /> Presencia y Cuidado
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" /> Espacio Contenido
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" /> Transformación Cuántica
            </span>
          </div>
        </div>
      </div>

      {/* Equipo: 2 Tarjetas con las fotos provistas */}
      <div>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-serif font-bold text-stone-800">
            Nuestro Equipo
          </h3>
          <p className="text-stone-500 text-sm mt-1">
            Facilitadoras y organizadora dedicadas a sostener tu espacio de sanación
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Facilitadoras: Vero & Nancy */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300">
            <div>
              <div className="w-full aspect-[3/4] relative rounded-2xl overflow-hidden mb-6 bg-stone-100 shadow-sm">
                <Image
                  src="/images/team/facilitators-vero-nancy.jpg"
                  alt="Facilitadoras: Vero y Nancy"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 bg-emerald-800/90 text-stone-50 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  Facilitadoras
                </div>
              </div>
              <h4 className="text-2xl font-serif font-bold text-stone-800">
                Vero & Nancy
              </h4>
              <span className="block text-xs font-semibold text-emerald-800 uppercase tracking-wider mt-1 mb-4">
                Facilitadoras de Procesos & Armonización
              </span>
              <div className="space-y-3 text-stone-600 text-xs sm:text-sm leading-relaxed">
                <p>
                  <strong>Verónica Laura Mora:</strong> Facilitadora de procesos de sanación y conciencia desde el enfoque cuántico y sistémico. Más de 9 años de experiencia en Constelaciones Familiares, LNT (Sanación Cuántica), Registros Akáshicos, Reiki y Tameana.
                </p>
                <p>
                  <strong>Nancy Román:</strong> Guía espacios de conexión corporal y armonización emocional a través de Yoga, Flores de Bach y Reiki, sosteniendo el proceso desde la suavidad y el equilibrio entre cuerpo, emoción y energía.
                </p>
              </div>
            </div>
          </div>

          {/* Organizadora: Dani */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300">
            <div>
              <div className="w-full aspect-[3/4] relative rounded-2xl overflow-hidden mb-6 bg-stone-100 shadow-sm">
                <Image
                  src="/images/team/organizer-dani.jpg"
                  alt="Organizadora: Dani"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 bg-purple-900/90 text-stone-50 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  Organizadora
                </div>
              </div>
              <h4 className="text-2xl font-serif font-bold text-stone-800">
                Dani
              </h4>
              <span className="block text-xs font-semibold text-purple-900 uppercase tracking-wider mt-1 mb-4">
                Daniela Belén García Cabrera
              </span>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Licenciada en Administración y organizadora de Despertar. Este retiro nace de un proceso personal real: el deseo de compartir, con respeto y autenticidad, las herramientas que fueron claves en mi propio camino de despertar espiritual. Acompaño creando un espacio cuidado, coherente y profundamente humano.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
