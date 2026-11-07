'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '@/types';
import LikeHeartButton from './LikeHeartButton';

interface WrittenTestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export default function WrittenTestimonialCard({
  testimonial,
  className = '',
}: WrittenTestimonialCardProps) {
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
    <div
      className={`bg-white p-6 sm:p-8 rounded-3xl border border-stone-100 shadow-md shadow-stone-200/50 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-stone-200/60 ${className}`}
    >
      <div>
        {/* Fila superior: Calificación de estrellas y Botón de Like */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1 text-amber-500">
            {[...Array(testimonial.rating || 5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <LikeHeartButton testimonialId={testimonial.id} />
        </div>

        {/* Comentario del participante */}
        <p className="text-stone-600 leading-relaxed italic text-sm sm:text-base">
          "{testimonial.content}"
        </p>
      </div>

      {/* Información del participante */}
      <div className="flex items-center gap-4 mt-6 pt-6 border-t border-stone-100">
        {testimonial.avatarUrl ? (
          <img
            src={testimonial.avatarUrl}
            alt={testimonial.title}
            className="w-12 h-12 rounded-full object-cover border border-stone-100"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 font-serif flex items-center justify-center font-bold text-sm border border-emerald-100/50 flex-shrink-0">
            {getInitials(testimonial.title)}
          </div>
        )}
        <div>
          <h3 className="font-serif text-stone-800 font-semibold text-sm sm:text-base leading-snug">
            {testimonial.title}
          </h3>
          {testimonial.subtitle && (
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              {testimonial.subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

