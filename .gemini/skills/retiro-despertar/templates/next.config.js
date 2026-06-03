// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Optimizaciones de imagen
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.elretiro.com',
      },
    ],
  },

  // Headers personalizados
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
  ],

  // Redirects (si es necesario)
  redirects: async () => [
    // Redirigir URLs antiguas
  ],

  // Rewrites (si es necesario)
  rewrites: async () => ({
    beforeFiles: [
      // Reescrituras internas
    ],
  }),

  // Sitemaps y robots.txt
  // Configurados con next-sitemap

  // Performance
  swcMinify: true,
  compress: true,
};

module.exports = nextConfig;
