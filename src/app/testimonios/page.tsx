import { Metadata } from 'next';
import FeedbackCarousel from '@/components/FeedbackCarousel';

export const metadata: Metadata = {
  title: 'Testimonios | Retiro Despertar',
  description: 'Conocé las experiencias y vivencias de quienes participaron en el Retiro Despertar.',
};

export default function TestimoniosPage() {
  return (
    <main className="min-h-screen pt-8 bg-stone-50">
      <FeedbackCarousel showViewMoreButton={false} />
    </main>
  );
}

