import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'Retiro Despertar | Constelaciones Familiares, Reiki y Yoga',
  description:
    'Un espacio sagrado para el bienestar y la sanación holística. Únete al Retiro Despertar y reconecta con tu cuerpo, mente y sistema familiar a través del Yoga, Reiki y Constelaciones.',
  keywords: [
    'Retiro Despertar',
    'Retiro Espiritual',
    'Constelaciones Familiares',
    'Reiki',
    'Yoga',
    'Sanación Holística',
    'Meditación',
    'Bienestar',
    'Autoconocimiento',
  ],
  authors: [{ name: 'Retiro Despertar' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Retiro Despertar | Constelaciones Familiares, Reiki y Yoga',
    description:
      'Un encuentro único de sanación integral, bienestar e introspección profunda. Reserva tu lugar en el Retiro Despertar.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Retiro Despertar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retiro Despertar | Constelaciones Familiares, Reiki y Yoga',
    description:
      'Un espacio sagrado de sanación holística y reconexión profunda.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-stone-50 text-stone-800 font-sans antialiased min-h-screen selection:bg-emerald-800 selection:text-stone-50">
        {children}
      </body>
    </html>
  );
}
