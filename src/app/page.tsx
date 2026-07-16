import HeroOverview from '@/components/HeroOverview';
import ImageCarousel from '@/components/ImageCarousel';
import UpcomingRetreats from '@/components/UpcomingRetreats';
import FeedbackCarousel from '@/components/FeedbackCarousel';
import FormRegister from '@/components/FormRegister';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* 1. Hero / Overview */}
      <HeroOverview />

      {/* 2. Carrusel de Imágenes de la Experiencia */}
      <ImageCarousel />

      {/* 3. Próximos Retiros */}
      <UpcomingRetreats />

      {/* 4. Carrusel de Testimonios / Feedbacks */}
      <FeedbackCarousel />

      {/* 4. Formulario de Inscripción */}
      <FormRegister />
    </main>
  );
}
