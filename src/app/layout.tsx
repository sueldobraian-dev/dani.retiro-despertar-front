import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import '../styles/globals.css';

// Configuración de la fuente Sans-Serif limpia para textos de lectura
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

// Configuración de la fuente Serif elegante para títulos
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '600', '700'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://retirodespertar.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Retiro Despertar | Constelaciones Familiares, Reiki, Yoga y Chef Privado',
  description:
    'Un espacio sagrado de bienestar e introspección holística. Reconecta con tu cuerpo, mente y sistema familiar a través del Yoga, Reiki y Constelaciones en un entorno natural único.',
  keywords: [
    'Retiro Despertar',
    'Retiro Espiritual',
    'Constelaciones Familiares',
    'Reiki',
    'Yoga',
    'Chef Privado',
    'Sanación Holística',
    'Meditación',
    'Bienestar',
    'Autoconocimiento',
  ],
  authors: [{ name: 'Retiro Despertar' }],
  robots: 'index, follow',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Retiro Despertar | Constelaciones Familiares, Reiki, Yoga y Chef Privado',
    description:
      'Un encuentro único de bienestar integral e introspección profunda. Reserva tu lugar en el Retiro Despertar.',
    type: 'website',
    url: siteUrl,
    locale: 'es_AR',
    siteName: 'Retiro Despertar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retiro Despertar | Constelaciones Familiares, Reiki, Yoga y Chef Privado',
    description:
      'Un espacio sagrado de sanación holística y reconexión profunda.',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Retiro Despertar',
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    description:
      'Retiro holístico de introspección y bienestar combinando Constelaciones Familiares, Reiki, Yoga y Gastronomía de Chef Privado.',
    sameAs: [
      'https://www.instagram.com/despertar.retiroholistico',
      'https://www.facebook.com/share/1BVTYJAse8/',
    ],
  };

  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-stone-50 text-stone-800 font-sans antialiased min-h-screen selection:bg-emerald-800 selection:text-stone-50">
        <Header />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
