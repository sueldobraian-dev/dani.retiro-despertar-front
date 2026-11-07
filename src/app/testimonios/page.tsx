import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, MessageCircle, Calendar } from 'lucide-react';
import WrittenTestimonialsCarousel from '@/components/testimonials/WrittenTestimonialsCarousel';
import VideoCarousel16x9 from '@/components/testimonials/VideoCarousel16x9';
import ShortsCarousel9x16 from '@/components/testimonials/ShortsCarousel9x16';
import ComparisonNotice from '@/components/testimonials/ComparisonNotice';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Testimonios de Participantes | Retiro Despertar',
  description:
    'Descubrí las vivencias, aprendizajes y momentos de paz compartidos por quienes formaron parte del Retiro Despertar en Chascomús y Tigre Delta. Testimonios escritos y registros de video.',
  openGraph: {
    title: 'Testimonios de Participantes | Retiro Despertar',
    description:
      'Vivencias transformadoras de Constelaciones, Reiki y Yoga en entornos naturales únicos.',
    url: 'https://retirodespertar.com/testimonios',
  },
};

export default function TestimoniosPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-800">
      {/* 1. Hero Introductorio */}
      <section className="py-16 sm:py-20 bg-stone-100/50 border-b border-stone-200/40 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Voces del Retiro
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-800 mt-4 tracking-tight">
            Experiencias y Sentimientos Reales
          </h1>
          <p className="text-stone-600 mt-4 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Compartimos las vivencias genuinas de quienes vivieron la experiencia de desconectar de la rutina,
            conectar con la naturaleza y abrirse a la sanación grupal en el Retiro Despertar.
          </p>
        </div>
      </section>

      {/* 2. Sección: Testimonios Escritos (Carrusel Paginado) */}
      <section className="py-16 border-b border-stone-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-emerald-800 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Relatos de Participantes
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-800 mt-1 font-bold">
              Testimonios por Escrito
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2">
              Explorá las palabras de quienes transitaron Constelaciones, Reiki y Yoga. Hacé clic en el corazón para enviarles tu energía y gratitud.
            </p>
          </div>

          <WrittenTestimonialsCarousel />
        </div>
      </section>

      {/* 3. Sección: Módulo Multimedia y Comparativa de Videos */}
      <section className="py-16 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Cartel de Comparativa de formatos */}
          <ComparisonNotice />

          {/* Carrusel 1: Videos Tradicionales 16:9 */}
          <VideoCarousel16x9 />

          {/* Separador sutil */}
          <hr className="border-stone-100" />

          {/* Carrusel 2: YouTube Shorts 9:16 */}
          <ShortsCarousel9x16 />
        </div>
      </section>

      {/* 4. Llamado a la Acción (CTA de Cierre) */}
      <section className="py-16 sm:py-20 bg-stone-100/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-800">
            ¿Sentís el llamado a vivir tu propia experiencia?
          </h2>
          <p className="text-stone-600 mt-3 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Nuestros retiros tienen cupos intencionalmente reducidos para asegurar un cuidado íntimo, amoroso y transformador.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl('Hola! Leí los testimonios y quisiera consultar disponibilidad para sumarme al próximo retiro.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-stone-50 rounded-full font-semibold text-sm transition-all duration-300 shadow-md shadow-emerald-950/15 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar por WhatsApp</span>
            </a>
            <Link
              href="/#proximos-retiros"
              className="w-full sm:w-auto px-8 py-3.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-full font-semibold text-sm transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-emerald-800" />
              <span>Ver Próximos Retiros</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
