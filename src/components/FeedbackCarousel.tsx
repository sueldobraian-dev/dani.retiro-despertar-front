'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { Testimonial } from '@/types';
import { fetchTopLikedWrittenTestimonials } from '@/lib/testimonials';
import LikeHeartButton from './testimonials/LikeHeartButton';

export default function FeedbackCarousel() {
  const [feedbacks, setFeedbacks] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTopLikedWrittenTestimonials(4)
      .then((data) => {
        setFeedbacks(data);
      })
      .catch((err) => {
        console.error('Error fetching top feedbacks:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <section id="testimonios" className="py-16 bg-stone-50 border-t border-stone-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-800 font-semibold tracking-wider uppercase text-sm">
            Testimonios
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mt-2 font-bold">
            Lo que Dicen Nuestros Participantes
          </h2>
          <p className="text-stone-600 mt-3 text-base md:text-lg">
            Compartimos las vivencias y sentimientos más apreciados de quienes ya pasaron por el Retiro Despertar.
          </p>
        </div>

        {/* Estado de carga */}
        {loading ? (
          <div className="flex gap-6 overflow-hidden pb-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:pb-0">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-[80vw] sm:w-[50vw] md:w-auto bg-white p-6 rounded-3xl border border-stone-100 shadow-md animate-pulse h-64 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="h-4 bg-stone-200 rounded w-1/3" />
                  <div className="h-3 bg-stone-200 rounded w-full" />
                  <div className="h-3 bg-stone-200 rounded w-5/6" />
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                  <div className="w-10 h-10 rounded-full bg-stone-200" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 bg-stone-200 rounded w-1/2" />
                    <div className="h-2 bg-stone-200 rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Carrusel en móvil y Grid en escritorio (4 items destacados) */
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-x-visible md:snap-none md:pb-0">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-auto snap-center bg-white p-6 rounded-3xl border border-stone-100 shadow-md shadow-stone-200/50 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-stone-200/60"
              >
                <div>
                  {/* Estrellas y botón de like (sin número) */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1 text-amber-500">
                      {[...Array(feedback.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <LikeHeartButton testimonialId={feedback.id} />
                  </div>

                  {/* Comentario */}
                  <p className="text-stone-600 leading-relaxed italic text-sm line-clamp-4">
                    "{feedback.content}"
                  </p>
                </div>

                {/* Información del usuario */}
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-stone-100">
                  {feedback.avatarUrl ? (
                    <img
                      src={feedback.avatarUrl}
                      alt={feedback.title}
                      className="w-10 h-10 rounded-full object-cover border border-stone-100 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 font-serif flex items-center justify-center font-bold text-xs border border-emerald-100/50 flex-shrink-0">
                      {getInitials(feedback.title)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-serif text-stone-800 font-semibold text-sm truncate">
                      {feedback.title}
                    </h3>
                    {feedback.subtitle && (
                      <p className="text-stone-500 text-xs truncate">
                        {feedback.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}

        {/* Enlace para ver todos los testimonios en la página dedicada /testimonios */}
        <div className="mt-12 text-center">
          <Link
            href="/testimonios"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-stone-50 rounded-full font-medium transition duration-300 ease-in-out shadow-md shadow-emerald-900/10 cursor-pointer text-sm"
          >
            <span>Ver más testimonios</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
