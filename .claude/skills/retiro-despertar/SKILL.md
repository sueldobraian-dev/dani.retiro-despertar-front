---
name: Retiro Despertar Landing Page
description: "Use when: developing the El Retiro holistic wellness retreat landing page with Next.js, mobile-first design, and hand-sketched wireframe aesthetic"
type: skill
---

# 🧘 El Retiro Despertar - Landing Page Skill

Guía completa para construir la landing page de "El Retiro" — un retiro holístico de bienestar con diseño mobile-first basado en wireframes a mano alzada.

## 🎯 Visión del Producto

**El Retiro** es una experiencia inmersiva de bienestar que incluye meditación, actividades guiadas, hospedaje, alimentación consciente y desconexión digital. La landing page debe capturar la esencia de pausa, introspección y reconexión.

### Secciones Principales

1. **Hero Section** – "Reconecta contigo mismo. Pausa el ruido."
2. **Timeline (Un día en El Retiro)** – Experiencia horaria del día
3. **El Lugar/Entorno** – Carrusel de imágenes del espacio
4. **Testimonios** – Experiencias de participantes
5. **Value Proposition** – Qué incluye la experiencia
6. **Precios e Inversión** – Early bird y regular
7. **FAQs** – Preguntas frecuentes
8. **Footer** – Contacto y redes

---

## 📱 Principios de Diseño

### Mobile-First Approach
- **Viewport base**: 375px (iPhone SE)
- **Breakpoints**: 640px (tablet), 1024px (desktop)
- **Touch-friendly**: Botones ≥48px, espaciado generoso
- **Performance**: Lazy loading de imágenes, code splitting

### Estética Hand-Drawn
- Ilustraciones artesanales (no fotos glossy)
- Tipografía relajada (ej. "Poppins" + "Playfair Display")
- Colores cálidos: terracota, sage green, crema, dorado
- Bordes irregulares, formas orgánicas
- Espacios en blanco amplios (breathing room)

### Animaciones Sutiles
- Fade-in al scroll (IntersectionObserver)
- Micro-interacciones en botones (hover effects)
- Transiciones suaves (200-300ms)

---

## 🏗️ Arquitectura Next.js

### Estructura de Carpetas

```
/pages
  /index.js          # Home - renderizado estático (SSG)
  /equipo.js         # Team page
  /practicas.js      # Holistic practices
  /politica-privacidad.js
  /terminos.js
  /_app.js
  /_document.js
  /api
    /contact.js      # Endpoint para formularios

/components
  /layout
    Navbar.jsx
    Footer.jsx
    Container.jsx
  /sections
    HeroSection.jsx
    TimelineSection.jsx
    LocationCarousel.jsx
    TestimonialsSection.jsx
    PricingSection.jsx
    FAQSection.jsx
    ValuePropositionSection.jsx
  /ui
    Button.jsx
    Card.jsx
    Badge.jsx
    Modal.jsx
    Accordion.jsx
  /common
    Head.jsx         # Meta tags para cada página

/lib
  /hooks
    useInView.js
    useWindowSize.js
  /api
    contact.js       # Lógica para envío de forms
  utils.js           # Helpers generales
  constants.js       # Colores, textos, configuración

/public
  /images
    /hero
    /timeline
    /testimonials
    /location
  /icons
    logo.svg
    social-icons.svg

/styles
  globals.css
  variables.css      # CSS custom properties (colores, tipografía)
  tailwind.config.js

.env.local
next.config.js
tailwind.config.js
package.json
```

---

## 🚀 Roadmap de Implementación

### Fase 1: Setup (1-2 horas)
- [ ] `npx create-next-app retiro-despertar --typescript --tailwind`
- [ ] Configurar ESLint + Prettier
- [ ] Instalar dependencias: `next-image-export-optimizer`, `react-icons`, `classnames`
- [ ] Crear estructura de carpetas
- [ ] Setup de variables CSS (colores, tipografía)

### Fase 2: Layout Base (2 horas)
- [ ] Crear `_app.js` y `_document.js`
- [ ] Componentes `Navbar` y `Footer` (sticky footer)
- [ ] Componente `Container` reutilizable
- [ ] Resolver `_app.css` para estilos globales
- [ ] Testar responsive en 375px, 768px, 1024px

### Fase 3: Secciones Principales (4-5 horas)

#### Hero Section
- [ ] Imagen hero (hand-drawn landscape con persona meditando)
- [ ] Tipografía principal: "Reconecta contigo mismo. Pausa el ruido."
- [ ] CTA: "Reservar mi lugar" (botón destacado)
- [ ] Ajuste responsive: texto más pequeño en mobile

#### Un día en El Retiro (Timeline)
- [ ] Timeline vertical (mobile) → horizontal (desktop)
- [ ] Horas: 07:00 AM, 08:30 AM, 11:00 AM, 01:30 PM, 05:30 PM
- [ ] Iconos para cada actividad (meditación, desayuno, taller, etc.)
- [ ] Animación de entrada al scroll

#### El Lugar / Carrusel
- [ ] Implementar carrusel de imágenes (React Swiper o Embla)
- [ ] 4-5 imágenes ilustradas del espacio
- [ ] Indicadores de página (dots)
- [ ] Navegación con flechas (mobile: swipe)

#### Testimonios
- [ ] Grid de 3 testimonios (mobile: 1 col, tablet: 2 col, desktop: 3 col)
- [ ] Card con nombre, foto, cita
- [ ] Animación fade-in staggered

#### Value Proposition
- [ ] 4 boxes: Hospedaje Premium, Alimentación Consciente, Actividades Guiadas, Desconexión Digital
- [ ] Iconos artesanales + descripción
- [ ] Responsive: 2x2 (mobile), 4x1 (desktop)

#### Precios
- [ ] 2 opciones: Early Bird ($XXX) vs Regular ($XXX)
- [ ] Incluye checklist de qué viene en cada uno
- [ ] CTA: "Reservar ahora"
- [ ] Badge "Popular" en la opción recomendada

#### FAQs
- [ ] Accordion component
- [ ] 5-7 preguntas comunes
- [ ] Respuestas claras y concisas

### Fase 4: SEO y Performance (1-2 horas)
- [ ] `next/image` para optimización
- [ ] Head meta tags en cada página
- [ ] `next-sitemap` configuración
- [ ] `robots.txt` generado
- [ ] Lighthouse audit (target: 90+)
- [ ] Lazy loading de imágenes

### Fase 5: Formulario de Contacto (1 hora)
- [ ] Form con validación (email, nombre, mensaje)
- [ ] Endpoint `/api/contact` para envío
- [ ] Toast notification (éxito/error)
- [ ] Anti-spam: rate limiting opcional

### Fase 6: Refinamientos (1-2 horas)
- [ ] Testear en dispositivos reales (iOS, Android)
- [ ] Animaciones smoothness
- [ ] Accesibilidad (WCAG 2.1 AA)
- [ ] Testing de performance
- [ ] Deployment en Vercel

---

## 📐 Paleta de Colores

```css
--color-primary: #A0826D;      /* Terracota */
--color-secondary: #9CAF88;    /* Sage Green */
--color-accent: #D4AF37;       /* Dorado */
--color-light: #F5F1EB;        /* Crema */
--color-text: #2B2B2B;         /* Charcoal */
--color-text-light: #666;
--color-border: #E8E4DC;
```

---

## 🎨 Tipografía

- **Headings**: Playfair Display (serif, elegante)
- **Body**: Poppins (sans-serif, amigable)
- **Monospace (código)**: JetBrains Mono

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
}

h1, h2, h3 {
  font-family: 'Playfair Display', serif;
}
```

---

## ⚡ Componentes Clave

### 1. Button (CTA)

```jsx
// /components/ui/Button.jsx
export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button 
      className={`rounded-lg font-semibold transition-all ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 2. TimelineItem

```jsx
// /components/sections/TimelineItem.jsx
export default function TimelineItem({ time, title, description, icon }) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white">
          {icon}
        </div>
        <div className="w-1 h-24 bg-border mt-2"></div>
      </div>
      <div>
        <p className="font-bold text-primary">{time}</p>
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-text-light text-sm">{description}</p>
      </div>
    </div>
  );
}
```

### 3. Accordion (FAQs)

```jsx
// /components/ui/Accordion.jsx
import { useState } from 'react';
import { ChevronDown } from 'react-icons/bs';

export default function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left font-semibold hover:text-primary transition"
      >
        {question}
        <ChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="mt-3 text-text-light">{answer}</p>}
    </div>
  );
}
```

---

## 🔍 SEO Checklist

- [ ] Meta title y description en cada página
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter Card tags
- [ ] Sitemap generado con `next-sitemap`
- [ ] `robots.txt` configurado
- [ ] Canonical URLs
- [ ] Structured data (JSON-LD) para Organization, Event
- [ ] Alt text en todas las imágenes
- [ ] Mobile viewport meta tag
- [ ] Lighthouse score ≥90

---

## 🔐 Middleware (Futura Integración con APIs)

```javascript
// next.config.js - para futuro CORS con Mercado Libre / Amazon
const nextConfig = {
  headers: async () => [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Credentials', value: 'true' },
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
        { key: 'Access-Control-Allow-Headers', value: 'Content-Type,Authorization' },
      ],
    },
  ],
};

module.exports = nextConfig;
```

---

## 📦 Dependencias Recomendadas

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "tailwindcss": "^3.0.0",
    "react-icons": "^4.11.0",
    "embla-carousel-react": "^7.0.0",
    "classnames": "^2.3.2"
  },
  "devDependencies": {
    "next-sitemap": "^4.2.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

---

## 🎯 Performance Targets

| Métrica | Target |
|---------|--------|
| Lighthouse Performance | ≥90 |
| Lighthouse Accessibility | ≥95 |
| Lighthouse Best Practices | ≥90 |
| Lighthouse SEO | ≥95 |
| First Contentful Paint (FCP) | <1.5s |
| Largest Contentful Paint (LCP) | <2.5s |
| Cumulative Layout Shift (CLS) | <0.1 |

---

## 📋 Testing Checklist

### Desktop (1920x1080)
- [ ] Todas las secciones visibles sin scroll horizontal
- [ ] Carrusel funciona con flechas
- [ ] Hover effects en botones y cards
- [ ] Animaciones smooth

### Tablet (768x1024)
- [ ] Layout responsive correcto
- [ ] Touch interactions funcionen
- [ ] Textos legibles sin zoom

### Mobile (375x667)
- [ ] Una columna en secciones
- [ ] Botones ≥48px (touch targets)
- [ ] Carrusel con swipe
- [ ] Navbar hamburger menu (si aplica)
- [ ] Imágenes optimizadas (no pixeladas)

### Navegadores
- [ ] Chrome/Chromium (Windows, Mac, Android)
- [ ] Safari (iOS, macOS)
- [ ] Firefox (Windows, Mac, Linux)

---

## 🚀 Deployment

**Plataforma recomendada**: Vercel (optimizado para Next.js)

```bash
# 1. Hacer push a GitHub
git add .
git commit -m "feat: Initial El Retiro landing page"
git push

# 2. Conectar en Vercel y deploying automático
# O manual: vercel deploy
```

---

## 💡 Próximos Pasos

1. Confirmar paleta de colores con diseño (mostrar referencias)
2. Recolectar imágenes/ilustraciones de alta calidad
3. Redactar copys en español (títulos, descripciones, CTA)
4. Configurar email para formulario de contacto
5. Pensar en futura integración de sistema de reservas

---

**Última actualización**: 2026-06-01 | **Responsable**: Tu equipo de desarrollo
