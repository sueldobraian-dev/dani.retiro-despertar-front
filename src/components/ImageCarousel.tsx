import { ExperienceImage } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const mockImages: ExperienceImage[] = [
  {
    id: '1',
    src: '/images/experience/meditacion.jpg',
    alt: 'Meditación grupal en la naturaleza',
    caption: 'Espacio de Meditación & Yoga',
  },
  {
    id: '2',
    src: '/images/experience/comida.jpg',
    alt: 'Comida saludable y vegetariana',
    caption: 'Nutrición consciente y saludable',
  },
  {
    id: '3',
    src: '/images/experience/fogata.jpg',
    alt: 'Fuego central en la noche del retiro',
    caption: 'Círculo de fuego y sanación grupal',
  },
  {
    id: '4',
    src: '/images/experience/vista_aerea.jpg',
    alt: 'Entorno natural que rodea el retiro',
    caption: 'Entorno natural único y de desconexión',
  },
];

export default function ImageCarousel() {
  return (
    <section id="experiencia" className="py-16 bg-white border-y border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-800 font-semibold tracking-wider uppercase text-sm">
            La Experiencia
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mt-2">
            El Entorno y las Actividades
          </h2>
          <p className="text-stone-600 mt-3 text-base md:text-lg">
            Un recorrido visual por los momentos y espacios que darán forma a tu camino de transformación y descanso.
          </p>
        </div>

        {/* Carrusel en móvil y Grid en escritorio */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-x-visible md:snap-none md:pb-0">
          {mockImages.map((image) => (
            <div
              key={image.id}
              className="flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-auto snap-center flex flex-col group"
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md shadow-stone-100 border border-stone-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="mt-4 px-2">
                <h3 className="font-serif text-stone-800 text-lg group-hover:text-emerald-800 transition-colors duration-300">
                  {image.caption}
                </h3>
                <p className="text-stone-500 text-sm mt-1">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enlace para redirigir a la galería */}
        <div className="mt-12 text-center">
          <Link
            href="/galeria"
            className="inline-flex items-center gap-2 px-6 py-3 border border-emerald-700 hover:bg-emerald-50 text-emerald-800 rounded-full font-medium transition duration-300 ease-in-out shadow-sm"
          >
            Ver más sobre la experiencia
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.63l-3.22-3.22a.75.75 0 111.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>

  );
}
