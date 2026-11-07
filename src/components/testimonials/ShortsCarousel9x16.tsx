'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';
import { Testimonial } from '@/types';
import { fetchVideoTestimonials } from '@/lib/testimonials';
import { getYouTubeThumbnailUrl } from '@/lib/youtube';
import LikeHeartButton from './LikeHeartButton';
import VideoPlayerModal from './VideoPlayerModal';

export default function ShortsCarousel9x16() {
  const [shorts, setShorts] = useState<Testimonial[]>([]);
  const [activeShort, setActiveShort] = useState<Testimonial | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchVideoTestimonials('short').then((data) => {
      setShorts(data);
    });
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="space-y-6">
      {/* Encabezado y controles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/60">
              <Smartphone className="w-3.5 h-3.5 text-amber-800" />
              Opción B: Formato Vertical Shorts (9:16)
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-stone-800 mt-2 font-bold">
            YouTube Shorts & Relatos Cortos
          </h3>
          <p className="text-stone-600 text-sm mt-1">
            Formato moderno vertical y dinámico, ideal para testimonios directos en primer plano desde smartphones.
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label="Shorts anteriores"
            className="p-2.5 rounded-full bg-white border border-stone-200/80 text-stone-700 hover:bg-stone-50 hover:text-emerald-800 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            aria-label="Shorts siguientes"
            className="p-2.5 rounded-full bg-white border border-stone-200/80 text-stone-700 hover:bg-stone-50 hover:text-emerald-800 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Carrusel de Shorts 9:16 */}
      <div
        ref={scrollContainerRef}
        className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-1 focus:outline-none"
      >
        {shorts.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-[65vw] sm:w-[35vw] md:w-[250px] snap-start bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-md shadow-stone-200/50 flex flex-col group transition-all duration-300 hover:shadow-xl hover:shadow-stone-200/70"
          >
            {/* Contenedor vertical estilo móvil */}
            <div
              onClick={() => setActiveShort(item)}
              className="relative w-full aspect-[9/16] bg-stone-900 overflow-hidden cursor-pointer"
            >
              <img
                src={getYouTubeThumbnailUrl(item.content || '')}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/30 flex flex-col justify-between p-4">
                {/* Botón de like superior */}
                <div
                  className="self-end"
                  onClick={(e) => e.stopPropagation()}
                >
                  <LikeHeartButton
                    testimonialId={item.id}
                    className="bg-stone-900/60 text-white hover:bg-white hover:text-rose-500 backdrop-blur-sm"
                  />
                </div>

                {/* Botón Play central */}
                <div className="self-center my-auto">
                  <div className="w-12 h-12 rounded-full bg-white/90 group-hover:bg-emerald-700 text-stone-800 group-hover:text-white flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Información superpuesta inferior */}
                <div className="text-white">
                  <h4 className="font-serif text-sm sm:text-base font-semibold leading-snug line-clamp-2">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="text-stone-300 text-xs mt-0.5">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal reproductor en formato vertical */}
      <VideoPlayerModal
        isOpen={Boolean(activeShort)}
        onClose={() => setActiveShort(null)}
        videoUrl={activeShort?.content || ''}
        title={activeShort?.title}
        aspectRatio="9/16"
      />
    </div>
  );
}

