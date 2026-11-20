import { ExperienceImage } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Trees, Waves, ChevronRight, Sparkles } from 'lucide-react';

interface CarouselItem extends ExperienceImage {
  href: string;
}

interface ExperienceCapsulePreview {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  icon: 'users' | 'trees' | 'waves';
  badge?: string;
}

const EXPERIENCE_CAPSULE_PREVIEWS: ExperienceCapsulePreview[] = [
  {
    id: 'quienes-somos',
    title: 'Quiénes Somos',
    subtitle: 'Nuestra esencia y equipo',
    description:
      'Conocé a Vero, Nancy y Dani: las facilitadoras y organizadora que sostienen cada encuentro con amor y presencia.',
    href: '/experiencia#quienes-somos',
    icon: 'users',
  },
  {
    id: 'chascomus-finca-los-coipos',
    title: 'Finca Los Coipos (Chascomús)',
    subtitle: 'Naturaleza y caballos',
    description:
      '11 hectáreas con laguna privada, Constelaciones con caballos, Yoga, Reiki, cronograma paso a paso y cómo llegar.',
    href: '/experiencia#retiro-despertar/chascomus-finca-los-coipos',
    icon: 'trees',
  },
  {
    id: 'tigre-delta-minahasa',
    title: 'Complejo Minahasa (Delta)',
    subtitle: 'Paz sobre el río',
    description:
      'Una inmersión profunda entre arroyos, silencio e islas en la vegetación del Delta de Tigre.',
    href: '/experiencia#retiro-despertar/tigre-delta-minahasa',
    icon: 'waves',
  },
];

const mockImages: CarouselItem[] = [
  {
    id: '1',
    src: '/images/experience/meditacion.jpg',
    alt: 'Meditación grupal en la naturaleza',
    caption: 'Espacio de Meditación & Yoga',
    href: '/galeria#actividades',
  },
  {
    id: '2',
    src: '/images/experience/comida.jpg',
    alt: 'Comida saludable y vegetariana',
    caption: 'Nutrición consciente y saludable',
    href: '/galeria#gastronomia',
  },
  {
    id: '3',
    src: '/images/experience/fogata.jpg',
    alt: 'Fuego central en la noche del retiro',
    caption: 'Círculo de fuego y sanación grupal',
    href: '/galeria#retiro-despertar/tigre-delta-minahasa',
  },
  {
    id: '4',
    src: '/images/experience/vista_aerea.jpg',
    alt: 'Entorno natural que rodea el retiro',
    caption: 'Entorno natural único y de desconexión',
    href: '/galeria#retiro-despertar/chascomus-finca-los-coipos',
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
            <Link
              key={image.id}
              href={image.href}
              className="flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-auto snap-center flex flex-col group cursor-pointer"
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
            </Link>
          ))}
        </div>

        {/* Accesos directos a las 3 Cápsulas de /experiencia */}
        <div className="mt-14 pt-12 border-t border-stone-100">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
              <Sparkles className="w-3.5 h-3.5" /> Explorá en Detalle
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-800 mt-3">
              Conocé Nuestro Equipo y Sedes
            </h3>
            <p className="text-stone-600 text-sm sm:text-base mt-2">
              Elegí qué aspecto de la experiencia querés descubrir en profundidad:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXPERIENCE_CAPSULE_PREVIEWS.map((capsule) => (
              <Link
                key={capsule.id}
                href={capsule.href}
                className="group bg-stone-50/80 hover:bg-emerald-50/40 rounded-3xl p-6 sm:p-7 border border-stone-200/70 hover:border-emerald-300/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-800 text-stone-50 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      {capsule.icon === 'users' && <Users className="w-5 h-5" />}
                      {capsule.icon === 'trees' && <Trees className="w-5 h-5" />}
                      {capsule.icon === 'waves' && <Waves className="w-5 h-5" />}
                    </div>
                    {capsule.badge && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-100/80 text-amber-900 border border-amber-200/60">
                        {capsule.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                      {capsule.subtitle}
                    </span>
                    <h4 className="text-xl font-serif font-bold text-stone-800 mt-1 group-hover:text-emerald-900 transition-colors">
                      {capsule.title}
                    </h4>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-2">
                      {capsule.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center justify-between text-xs sm:text-sm font-semibold text-emerald-800 group-hover:text-emerald-950">
                  <span>Ver detalle completo</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Enlace para redirigir a la página de experiencia */}
        <div className="mt-10 text-center">
          <Link
            href="/experiencia"
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
