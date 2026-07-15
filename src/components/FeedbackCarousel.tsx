import { FeedbackParticipant } from '@/types';
import { Star } from 'lucide-react';
import Link from 'next/link';

const mockFeedbacks: FeedbackParticipant[] = [
  {
    id: '1',
    name: 'Carolina Gómez',
    role: 'Participante de Constelaciones',
    comment:
      'El trabajo con las Constelaciones Familiares marcó un antes y un después en mi relación familiar. Pude comprender lazos que venía arrastrando hace años. El entorno natural y la calidez del grupo hicieron todo sumamente sanador.',
    avatarUrl: '',
    rating: 5,
  },
  {
    id: '2',
    name: 'Mariano Silva',
    role: 'Practicante de Yoga y Reiki',
    comment:
      'Las clases de yoga frente a las sierras y las sesiones de Reiki me devolvieron una paz mental que creía perdida por el estrés de la ciudad. El lugar es mágico y la comida consciente es exquisita.',
    avatarUrl: '',
    rating: 5,
  },
  {
    id: '3',
    name: 'Valeria Castro',
    role: 'Participante de Bienestar Integral',
    comment:
      'Una experiencia transformadora. Las tres disciplinas se complementan de una forma orgánica e inteligente. La meditación junto a la fogata nocturna fue uno de los momentos más hermosos de mi vida.',
    avatarUrl: '',
    rating: 5,
  },
];

export default function FeedbackCarousel() {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <section id="testimonios" className="py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-800 font-semibold tracking-wider uppercase text-sm">
            Testimonios
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mt-2">
            Lo que Dicen Nuestros Participantes
          </h2>
          <p className="text-stone-600 mt-3 text-base md:text-lg">
            Compartimos las vivencias y sentimientos de quienes ya pasaron por el Retiro Despertar.
          </p>
        </div>

        {/* Carrusel en móvil y Grid en escritorio */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 md:grid md:grid-cols-3 md:overflow-x-visible md:snap-none md:pb-0">
          {mockFeedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-auto snap-center bg-white p-6 sm:p-8 rounded-3xl border border-stone-100 shadow-md shadow-stone-200/50 flex flex-col justify-between"
            >
              <div>
                {/* Estrellas de puntuación */}
                <div className="flex gap-1 mb-4 text-amber-500">
                  {[...Array(feedback.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Comentario */}
                <p className="text-stone-600 leading-relaxed italic text-sm sm:text-base">
                  "{feedback.comment}"
                </p>
              </div>

              {/* Información del usuario */}
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-stone-100">
                {feedback.avatarUrl ? (
                  <img
                    src={feedback.avatarUrl}
                    alt={feedback.name}
                    className="w-12 h-12 rounded-full object-cover border border-stone-100"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 font-serif flex items-center justify-center font-bold text-sm border border-emerald-100/50">
                    {getInitials(feedback.name)}
                  </div>
                )}
                <div>
                  <h3 className="font-serif text-stone-800 font-semibold text-sm sm:text-base">
                    {feedback.name}
                  </h3>
                  <p className="text-stone-500 text-xs sm:text-sm">
                    {feedback.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enlace para ver fotos/videos de testimonios en la galería */}
        <div className="mt-12 text-center">
          <Link
            href="/galeria#galeria-testimonios"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-stone-50 rounded-full font-medium transition duration-300 ease-in-out shadow-md shadow-emerald-900/10"
          >
            Ver testimonios en la galería
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.63l-3.22-3.22a.75.75 0 111.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>

  );
}
