'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, ChevronLeft, ChevronRight, Video } from 'lucide-react';
import { Testimonial } from '@/types';
import { fetchVideoTestimonials } from '@/lib/testimonials';
import { getYouTubeThumbnailUrl } from '@/lib/youtube';
import LikeHeartButton from './LikeHeartButton';
import VideoPlayerModal from './VideoPlayerModal';

export default function VideoCarousel16x9() {
  const [videos, setVideos] = useState<Testimonial[]>([]);
  const [activeVideo, setActiveVideo] = useState<Testimonial | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchVideoTestimonials('video').then((data) => {
      setVideos(data);
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100/60">
              <Video className="w-3.5 h-3.5" />
              Opción A: Formato Horizontal (16:9)
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-stone-800 mt-2 font-bold">
            Videos Testimoniales en Pantalla Panorámica
          </h3>
          <p className="text-stone-600 text-sm mt-1">
            Visualización cinematográfica tradicional para apreciar el entorno de la laguna y las actividades.
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label="Videos anteriores"
            className="p-2.5 rounded-full bg-white border border-stone-200/80 text-stone-700 hover:bg-stone-50 hover:text-emerald-800 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            aria-label="Videos siguientes"
            className="p-2.5 rounded-full bg-white border border-stone-200/80 text-stone-700 hover:bg-stone-50 hover:text-emerald-800 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Carrusel de videos 16:9 */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-1 focus:outline-none"
      >
        {videos.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-[85vw] sm:w-[55vw] md:w-[420px] snap-start bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-md shadow-stone-200/50 flex flex-col justify-between group transition-all duration-300 hover:shadow-xl hover:shadow-stone-200/70"
          >
            {/* Contenedor del video con miniatura */}
            <div
              onClick={() => setActiveVideo(item)}
              className="relative w-full aspect-video bg-stone-900 overflow-hidden cursor-pointer"
            >
              <img
                src={getYouTubeThumbnailUrl(item.content || '')}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-emerald-700 text-stone-800 group-hover:text-white flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>

              {/* Botón de like flotante en la esquina */}
              <div
                className="absolute top-3 right-3 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <LikeHeartButton
                  testimonialId={item.id}
                  className="bg-stone-900/60 text-white hover:bg-white hover:text-rose-500 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Datos descriptivos */}
            <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
              <div>
                <h4 className="font-serif text-stone-800 text-base sm:text-lg font-semibold group-hover:text-emerald-800 transition-colors">
                  {item.title}
                </h4>
                {item.subtitle && (
                  <p className="text-stone-500 text-xs sm:text-sm mt-1">
                    {item.subtitle}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveVideo(item)}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-4 flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Ver video completo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal reproductor */}
      <VideoPlayerModal
        isOpen={Boolean(activeVideo)}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo?.content || ''}
        title={activeVideo?.title}
        aspectRatio="16/9"
      />
    </div>
  );
}

