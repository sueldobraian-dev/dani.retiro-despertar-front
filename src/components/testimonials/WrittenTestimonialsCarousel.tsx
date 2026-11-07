'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { Testimonial } from '@/types';
import { fetchWrittenTestimonials } from '@/lib/testimonials';
import WrittenTestimonialCard from './WrittenTestimonialCard';

const PAGE_SIZE = 10;

export default function WrittenTestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Carga inicial de los primeros 10 testimonios
  const loadInitialData = useCallback(async () => {
    setLoadingInitial(true);
    try {
      const { items, hasMore: moreAvailable } = await fetchWrittenTestimonials({
        offset: 0,
        limit: PAGE_SIZE,
      });
      setTestimonials(items);
      setHasMore(moreAvailable);
    } catch (err) {
      console.error('Error loading initial testimonials:', err);
    } finally {
      setLoadingInitial(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Cargar la siguiente tanda de 10 testimonios para expandir el carrusel
  const loadMoreTestimonials = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);

    try {
      const nextOffset = testimonials.length;
      const { items, hasMore: moreAvailable } = await fetchWrittenTestimonials({
        offset: nextOffset,
        limit: PAGE_SIZE,
      });

      // Añadir al carrusel existente sin duplicados
      setTestimonials((prev) => {
        const existingIds = new Set(prev.map((t) => t.id));
        const newUnique = items.filter((t) => !existingIds.has(t.id));
        return [...prev, ...newUnique];
      });
      setHasMore(moreAvailable);
    } catch (err) {
      console.error('Error loading more testimonials:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, testimonials.length]);

  // Scroll manual con botones
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });

    // Si nos movemos a la derecha y estamos cerca del final, precargamos los siguientes 10
    if (direction === 'right') {
      const isNearEnd =
        container.scrollLeft + container.clientWidth >= container.scrollWidth - scrollAmount * 1.5;
      if (isNearEnd && hasMore && !loadingMore) {
        loadMoreTestimonials();
      }
    }
  };

  // Detector de scroll horizontal para mobile/touch
  const handleScrollEvent = () => {
    if (!scrollContainerRef.current || loadingMore || !hasMore) return;
    const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current;
    if (scrollLeft + clientWidth >= scrollWidth - 200) {
      loadMoreTestimonials();
    }
  };

  return (
    <div className="relative">
      {/* Controles de navegación y badge */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100/60">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Mostrando {testimonials.length} {hasMore ? '+ testimonios' : 'testimonios'}
          </span>
          {loadingMore && (
            <span className="flex items-center gap-1 text-xs text-stone-500 animate-pulse">
              <Loader2 className="w-3 h-3 animate-spin text-emerald-700" />
              Cargando más...
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label="Testimonios anteriores"
            className="p-2.5 rounded-full bg-white border border-stone-200/80 text-stone-700 hover:bg-stone-50 hover:text-emerald-800 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            aria-label="Testimonios siguientes"
            className="p-2.5 rounded-full bg-white border border-stone-200/80 text-stone-700 hover:bg-stone-50 hover:text-emerald-800 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Esqueleto de carga inicial */}
      {loadingInitial ? (
        <div className="flex gap-6 overflow-hidden py-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[85vw] sm:w-[45vw] md:w-[360px] h-72 bg-white/70 rounded-3xl border border-stone-200/50 p-6 animate-pulse flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="h-4 bg-stone-200 rounded w-1/3" />
                <div className="h-4 bg-stone-200 rounded w-full" />
                <div className="h-4 bg-stone-200 rounded w-5/6" />
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
        /* Carrusel scrollable que va creciendo */
        <div
          ref={scrollContainerRef}
          onScroll={handleScrollEvent}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-1 focus:outline-none"
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[85vw] sm:w-[45vw] md:w-[360px] snap-start"
            >
              <WrittenTestimonialCard testimonial={item} className="h-full" />
            </div>
          ))}

          {/* Tarjeta final de "Cargar más" interactiva si quedan registros */}
          {hasMore && (
            <div className="flex-shrink-0 w-[85vw] sm:w-[45vw] md:w-[320px] snap-start flex items-center justify-center">
              <div className="w-full h-full bg-stone-100/70 border border-dashed border-stone-300/80 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                <button
                  type="button"
                  onClick={loadMoreTestimonials}
                  disabled={loadingMore}
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-stone-50 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Cargando más...</span>
                    </>
                  ) : (
                    <span>Ver siguientes 10</span>
                  )}
                </button>
                <p className="text-xs text-stone-500 mt-3">
                  Los testimonios continúan creciendo con cada avance
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
