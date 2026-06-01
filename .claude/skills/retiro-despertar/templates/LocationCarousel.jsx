// components/sections/LocationCarousel.jsx
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'react-icons/bs';

export default function LocationCarousel() {
  const [current, setCurrent] = useState(0);

  const images = [
    {
      src: '/images/location/space-1.jpg',
      alt: 'Sala de meditación con vista a la montaña'
    },
    {
      src: '/images/location/space-2.jpg',
      alt: 'Área de descanso al aire libre'
    },
    {
      src: '/images/location/space-3.jpg',
      alt: 'Jardín meditativo'
    },
    {
      src: '/images/location/space-4.jpg',
      alt: 'Comedor con vista natural'
    },
  ];

  const next = () => setCurrent((current + 1) % images.length);
  const prev = () => setCurrent((current - 1 + images.length) % images.length);

  return (
    <div className="relative w-full bg-light rounded-lg overflow-hidden">
      {/* Main Image */}
      <div className="relative h-64 md:h-96 lg:h-[500px] w-full">
        <Image
          src={images[current].src}
          alt={images[current].alt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition"
        aria-label="Imagen anterior"
      >
        <ChevronLeft size={24} className="text-primary" />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition"
        aria-label="Imagen siguiente"
      >
        <ChevronRight size={24} className="text-primary" />
      </button>

      {/* Indicators (Dots) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current
                ? 'bg-accent w-8'
                : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-semibold">
        {current + 1} / {images.length}
      </div>
    </div>
  );
}
