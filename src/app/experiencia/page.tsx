import { Metadata } from 'next';
import ExperienceContent from '@/components/ExperienceContent';

export const metadata: Metadata = {
  title: 'La Experiencia | Retiro Despertar',
  description: 'Conoce la propuesta de nuestros retiros holísticos en Finca Los Coipos (Chascomús) y Complejo Minahasa (Tigre - Delta), nuestras facilitadoras y programa completo.',
};

export default function ExperienciaPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <ExperienceContent />
    </main>
  );
}
