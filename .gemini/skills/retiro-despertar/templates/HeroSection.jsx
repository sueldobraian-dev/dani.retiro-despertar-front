// components/sections/HeroSection.jsx
import Image from 'next/image';
import Button from '../ui/Button';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-light">
      {/* Background Image (Hand-drawn landscape) */}
      <div className="absolute inset-0 opacity-40">
        <Image
          src="/images/hero/landscape.jpg"
          alt="Mountain landscape with meditating person"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <h1 className="font-playfair text-4xl md:text-6xl font-bold text-primary mb-4 leading-tight">
          Reconecta contigo mismo
        </h1>
        <p className="text-lg md:text-xl text-text mb-2">
          Pausa el ruido.
        </p>
        <p className="text-text-light mb-8 text-base md:text-lg">
          Una experiencia de meditación, prácticas holísticas y bienestar en armonía con la naturaleza.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="primary">
            Reservar mi lugar
          </Button>
          <Button size="lg" variant="outline">
            Conocer más
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
