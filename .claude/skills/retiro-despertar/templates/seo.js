// lib/seo.js
// Utilidades para SEO y meta tags

export function generateMetaTags(page = {}) {
  const defaults = {
    title: 'El Retiro | Retiro de Bienestar Holístico',
    description: 'Reconecta contigo mismo en El Retiro. Una experiencia inmersiva de meditación, prácticas holísticas y bienestar en armonía con la naturaleza.',
    image: 'https://elretiro.com/og-image.jpg',
    url: 'https://elretiro.com',
  };

  const meta = { ...defaults, ...page };

  return {
    title: meta.title,
    description: meta.description,
    image: meta.image,
    url: meta.url,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.url,
      type: meta.type || 'website',
      images: [
        {
          url: meta.image,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
      siteName: 'El Retiro',
      locale: 'es_ES',
    },
    twitter: {
      handle: '@elretiro',
      site: '@elretiro',
      cardType: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      image: meta.image,
    },
    canonical: meta.url,
  };
}

// Estructura para JSON-LD (Datos Estructurados)
export function generateSchemaMarkup(type = 'Organization') {
  const schemas = {
    Organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'El Retiro',
      'url': 'https://elretiro.com',
      'logo': 'https://elretiro.com/logo.png',
      'description': 'Retiro de bienestar holístico con meditación y prácticas sanadoras',
      'sameAs': [
        'https://www.instagram.com/elretiro',
        'https://www.facebook.com/elretiro',
        'https://www.linkedin.com/company/elretiro'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+1-234-567-89',
        'contactType': 'Customer Service',
        'email': 'info@elretiro.com'
      }
    },
    Event: {
      '@context': 'https://schema.org',
      '@type': 'Event',
      'name': 'El Retiro - Retiro de Bienestar',
      'description': 'Experiencia inmersiva de meditación y bienestar holístico',
      'url': 'https://elretiro.com',
      'startDate': '2026-07-01T07:00:00-03:00',
      'endDate': '2026-07-03T18:00:00-03:00',
      'eventStatus': 'https://schema.org/EventScheduled',
      'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
      'location': {
        '@type': 'Place',
        'name': 'El Retiro',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '[Ubicación después de confirmación]',
          'addressLocality': '[Ciudad]',
          'addressCountry': 'AR'
        }
      },
      'offers': {
        '@type': 'Offer',
        'url': 'https://elretiro.com',
        'price': 'XXX',
        'priceCurrency': 'ARS',
        'availability': 'https://schema.org/InStock',
        'validFrom': '2026-01-01T00:00:00Z'
      },
      'organizer': {
        '@type': 'Organization',
        'name': 'El Retiro',
        'url': 'https://elretiro.com'
      }
    },
  };

  return schemas[type] || schemas.Organization;
}

// Componente para incluir Schema en Head
export function SchemaMarkup({ schema }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Robots.txt contenido
export const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://elretiro.com/sitemap.xml
`;

// Directorio de exclusión (si es necesario)
export const exclusions = [
  '/admin',
  '/api/*',
  '/*.json',
  '/*.xml',
  '/private/*',
];
