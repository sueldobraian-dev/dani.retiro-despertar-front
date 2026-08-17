'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Camera, X } from 'lucide-react';
import { MediaItem } from '@/data/galleryMock';

interface ExperienceLocationCarouselProps {
  tag: string;
  title?: string;
  subtitle?: string;
}

export default function ExperienceLocationCarousel({
  tag,
  title = 'Momentos & Espacios',
  subtitle = 'Explorá algunas postales de la experiencia en este entorno',
}: ExperienceLocationCarouselProps) {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchImages() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/gallery?tag=${encodeURIComponent(tag)}&orderBy=experience-order`);
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        if (isMounted) {
          if (Array.isArray(data)) {
            setImages(data);
          } else {
            setImages([]);
          }
        }
      } catch (err: any) {
        if (isMounted) {
          console.error(`Error loading carousel images for tag ${tag}:`, err);
          setError(err.message || 'No se pudieron cargar las fotos');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchImages();

    return () => {
      isMounted = false;
    };
  }, [tag]);

  const handlePrevImage = useCallback(() => {
    if (selectedImageIndex === null || images.length === 0) return;
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : (prev as number) - 1));
  }, [selectedImageIndex, images.length]);

  const handleNextImage = useCallback(() => {
    if (selectedImageIndex === null || images.length === 0) return;
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : (prev as number) + 1));
  }, [selectedImageIndex, images.length]);

  // Teclado para navegación en Lightbox
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImageIndex, handlePrevImage, handleNextImage]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!loading && images.length === 0 && !error) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5" /> Galería de la Experiencia
          </span>
          <h3 className="text-2xl font-serif font-bold text-stone-800 mt-1">
            {title}
          </h3>
          {subtitle && (
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {images.length > 1 && (
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 transition shadow-sm cursor-pointer"
              aria-label="Anterior foto"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 transition shadow-sm cursor-pointer"
              aria-label="Siguiente foto"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex gap-4 overflow-hidden py-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-[75vw] sm:w-[320px] lg:w-[360px] aspect-[4/3] rounded-2xl bg-stone-200/70 animate-pulse shrink-0"
            />
          ))}
        </div>
      ) : error ? (
        <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-stone-500 text-xs">
          No se pudieron cargar las fotos en este momento.
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2"
        >
          {images.map((item, index) => (
            <button
              type="button"
              key={item.id || index}
              onClick={() => setSelectedImageIndex(index)}
              className="w-[78vw] sm:w-[320px] lg:w-[360px] shrink-0 snap-center group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-stone-200/60 bg-stone-100 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-emerald-700"
              aria-label={`Ver foto ampliada: ${item.alt || item.title || 'Foto'}`}
            >
              <Image
                src={item.src}
                alt={item.alt || `Foto de ${tag}`}
                fill
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 360px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {item.title && item.title !== 'Imagen' && (
                <div className="absolute bottom-3 left-3 right-3 text-stone-50 text-xs font-medium drop-shadow line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.title}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal para ver la foto ampliada y cambiar a la siguiente */}
      {selectedImageIndex !== null && images[selectedImageIndex] && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 bg-stone-950/95 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador de fotos ampliado"
        >
          {/* Barra Superior */}
          <div className="w-full flex items-center justify-between max-w-7xl px-4 py-2">
            <span className="text-stone-400 text-sm font-medium">
              {selectedImageIndex + 1} de {images.length}
            </span>
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="p-2 text-stone-400 hover:text-white bg-stone-900/80 hover:bg-stone-800 rounded-full border border-stone-800 transition-all duration-300 cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Área Principal: Imagen y Flechas de Navegación */}
          <div className="relative flex-1 w-full flex items-center justify-center max-w-7xl">
            {images.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-2 md:left-4 z-10 p-3 text-stone-300 hover:text-white bg-stone-900/70 hover:bg-stone-800 rounded-full transition-all duration-300 border border-stone-800/60 cursor-pointer"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <div className="relative w-full h-[72vh] max-w-5xl flex items-center justify-center p-2">
              <Image
                src={images[selectedImageIndex].largeSrc || images[selectedImageIndex].src}
                alt={images[selectedImageIndex].alt || 'Foto ampliada'}
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-contain max-h-full max-w-full select-none rounded-2xl"
                priority
              />
            </div>

            {images.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-2 md:right-4 z-10 p-3 text-stone-300 hover:text-white bg-stone-900/70 hover:bg-stone-800 rounded-full transition-all duration-300 border border-stone-800/60 cursor-pointer"
                aria-label="Foto siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Pie del modal con título */}
          <div className="w-full text-center py-3 px-6 max-w-2xl">
            <p className="text-stone-300 text-sm tracking-wide font-medium">
              {images[selectedImageIndex].title || images[selectedImageIndex].alt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
