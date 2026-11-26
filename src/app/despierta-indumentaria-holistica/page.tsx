import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowLeft } from 'lucide-react';
import BackButton from '@/components/BackButton';

export const metadata: Metadata = {
  title: 'Despierta indumentaria holística | Retiro Despertar',
  description:
    'Catálogo de ropa e indumentaria holística de la marca Despierta. Prendas conscientes pensadas para tu bienestar, práctica de yoga, meditación y conexión interior.',
};

export default function DespiertaIndumentariaHolisticaPage() {
  return (
    <main className="min-h-screen bg-stone-50 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-stone-100 p-6 sm:p-12 md:p-14">
          <div className="mb-6">
            <BackButton label="Volver al inicio" fallbackUrl="/" />
          </div>

          <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
            {/* Logo de la marca Despierta */}
            <div className="w-56 sm:w-64 md:w-72 mx-auto">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-stone-100 bg-amber-50/40">
                <Image
                  src="/images/indumentaria/logo-despierta.jpg"
                  alt="Logo Despierta indumentaria holística"
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 288px"
                />
              </div>
            </div>

            {/* Etiqueta de estado */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50/80 border border-amber-200/60 text-amber-800 text-xs sm:text-sm font-medium tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-700" aria-hidden="true" />
              <span>Catálogo en construcción</span>
            </div>

            {/* Título y mensaje */}
            <div className="space-y-4 max-w-xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-800 tracking-tight">
                Despierta indumentaria holística
              </h1>
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
                Esta página se encuentra actualmente <strong>en construcción</strong>. Estamos
                preparando nuestro catálogo de ropa holística con prendas pensadas para acompañar tu
                práctica, abrazar tu comodidad y bienestar diario, y despertar tu belleza natural
                desde el interior.
              </p>
              <p className="text-sm sm:text-base text-stone-500">
                Muy pronto podrás explorar todas nuestras colecciones y realizar tus pedidos desde
                aquí.
              </p>
            </div>

            {/* Acciones */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-stone-50 rounded-2xl text-sm font-semibold tracking-wide transition-all duration-300 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Explorar Retiro Despertar</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

