import React from 'react';
import HeroOverview from '@/components/HeroOverview';
import ImageCarousel from '@/components/ImageCarousel';
import UpcomingRetreats from '@/components/UpcomingRetreats';
import PromoCouponsSection from '@/components/PromoCouponsSection';
import FeedbackCarousel from '@/components/FeedbackCarousel';
import { HOME_SCROLL_SECTIONS, HomeSectionId } from '@/config/navigationConfig';

const SECTION_RENDERERS: Record<HomeSectionId, () => React.ReactNode> = {
  inicio: () => <HeroOverview />,
  experiencia: () => <ImageCarousel />,
  'proximos-retiros': () => <UpcomingRetreats />,
  beneficios: () => <PromoCouponsSection />,
  testimonios: () => <FeedbackCarousel />,
};

export default function Home() {
  const activeSections = HOME_SCROLL_SECTIONS.filter((section) => section.enabled);

  return (
    <main className="min-h-screen flex flex-col">
      {activeSections.map((section) => (
        <React.Fragment key={section.id}>
          {SECTION_RENDERERS[section.id]()}
        </React.Fragment>
      ))}
    </main>
  );
}
