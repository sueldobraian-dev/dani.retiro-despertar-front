import React from 'react';
import type { Metadata } from 'next';
import RedesHubContent from '@/components/RedesHubContent';
import { OFFICIAL_REDES_URL, SOCIAL_LINKS_ITEMS } from '@/config/socialLinksConfig';

export const metadata: Metadata = {
  title: 'Redes y Enlaces Oficiales | Retiro Despertar & Despierta Indumentaria',
  description:
    'Accedé a todos los canales oficiales de Retiro Despertar y Despierta Indumentaria Holística: sitio web oficial, catálogo de ropa consciente e Instagram de retiros e indumentaria.',
  keywords: [
    'Retiro Despertar redes',
    'Despierta Indumentaria Holística',
    'despierta.ropa',
    'despertar.retiroholistico',
    'Ropa holística',
    'Retiros espirituales Argentina',
  ],
  alternates: {
    canonical: OFFICIAL_REDES_URL,
  },
  openGraph: {
    title: 'Redes y Enlaces Oficiales | Retiro Despertar & Despierta Indumentaria',
    description:
      'Sitio oficial de Retiro Despertar, catálogo de Despierta Indumentaria Holística y nuestras comunidades en Instagram.',
    url: OFFICIAL_REDES_URL,
    type: 'website',
    locale: 'es_AR',
    siteName: 'Retiro Despertar',
    images: [
      {
        url: '/images/indumentaria/logo-despierta.jpg',
        width: 800,
        height: 800,
        alt: 'Retiro Despertar & Despierta Indumentaria Holística',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Redes y Enlaces Oficiales | Retiro Despertar & Despierta Indumentaria',
    description:
      'Conectá con nuestros retiros holísticos y nuestro catálogo de indumentaria consciente.',
    images: ['/images/indumentaria/logo-despierta.jpg'],
  },
};

export default function RedesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: 'Canales Oficiales de Retiro Despertar y Despierta Indumentaria Holística',
    url: OFFICIAL_REDES_URL,
    mainEntity: {
      '@type': 'Organization',
      name: 'Retiro Despertar & Despierta Indumentaria Holística',
      url: 'https://retiro-despertar.vercel.app/#inicio',
      logo: 'https://retiro-despertar.vercel.app/images/indumentaria/logo-despierta.jpg',
      sameAs: SOCIAL_LINKS_ITEMS.map((item) => item.url),
    },
  };

  return (
    <main className="min-h-screen bg-stone-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RedesHubContent />
    </main>
  );
}

