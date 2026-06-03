# 📖 Cómo Usar Esta Skill

Esta skill contiene toda la arquitectura y templates para desarrollar la landing page de "El Retiro" con diseño mobile-first basado en wireframes a mano alzada.

## 🎯 Archivos Incluidos

### Documentación Principal
- **SKILL.md** — Guía completa del proyecto (visión, arquitectura, roadmap, SEO, etc.)

### Templates de Componentes

#### Layout
- `Navbar.jsx` — Barra de navegación responsive con mobile menu
- `_app.jsx` — Configuración de fuentes y estilos globales

#### UI Components
- `Button.jsx` — Botón reutilizable con variantes (primary, secondary, outline)
- `Badge.jsx` — Badge para tags y etiquetas
- `Accordion.jsx` — Componente para FAQs expandibles

#### Secciones Principales
- `HeroSection.jsx` — Sección hero con imagen de fondo
- `TimelineSection.jsx` — Timeline del día en El Retiro
- `TimelineItem.jsx` — Item individual del timeline
- `PricingSection.jsx` — Sección de precios con dos planes

### Estilos
- `variables.css` — Variables CSS (colores, tipografía, espaciado)
- `globals.css` — Estilos globales y utilidades
- `tailwind.config.js` — Configuración de Tailwind con colores personalizados

---

## 🚀 Quick Start

### 1. Crear proyecto Next.js
```bash
npx create-next-app retiro-despertar --typescript --tailwind --eslint
cd retiro-despertar
```

### 2. Instalar dependencias adicionales
```bash
npm install react-icons embla-carousel-react
npm install -D next-sitemap
```

### 3. Copiar templates
Copia los archivos de esta skill a tu proyecto:

```
/components/layout/
  ├── Navbar.jsx
/components/ui/
  ├── Button.jsx
  ├── Badge.jsx
  ├── Accordion.jsx
/components/sections/
  ├── HeroSection.jsx
  ├── TimelineSection.jsx
  ├── TimelineItem.jsx
  ├── PricingSection.jsx
/styles/
  ├── variables.css
  ├── globals.css
tailwind.config.js
pages/_app.jsx
```

### 4. Configurar fuentes y estilos

En `pages/_app.jsx`, asegúrate de tener las importaciones de Google Fonts. Ver template incluido.

---

## 📐 Paleta de Colores

```
Primary (Terracota):     #A0826D
Secondary (Sage Green):  #9CAF88
Accent (Dorado):         #D4AF37
Light (Crema):           #F5F1EB
Text (Charcoal):         #2B2B2B
Text Light (Gray):       #666
Border:                  #E8E4DC
```

---

## 🎨 Tipografía

- **Headings**: Playfair Display (serif, elegante)
- **Body**: Poppins (sans-serif, amigable)

Las fuentes se cargan automáticamente en `_app.jsx` con `next/font/google`.

---

## 📱 Responsive Design

### Breakpoints
- Mobile: 375px (base)
- Tablet: 768px (`md:`)
- Desktop: 1024px (`lg:`)
- Large Desktop: 1280px

### Estrategia Mobile-First
Todos los componentes están diseñados para mobile primero. Usa Tailwind breakpoints (`md:`, `lg:`) para versiones en desktop.

Ejemplo:
```jsx
<h1 className="text-2xl md:text-4xl lg:text-5xl">
  Título
</h1>
```

---

## 🔄 Componentes Clave

### Button
```jsx
<Button variant="primary" size="md">
  Reservar
</Button>

<Button variant="secondary" size="lg">
  Más info
</Button>

<Button variant="outline">
  Cancelar
</Button>
```

Variantes: `primary`, `secondary`, `outline`
Tamaños: `sm`, `md`, `lg`

### Accordion (FAQs)
```jsx
import { Accordion } from '@/components/ui/Accordion';

const faqItems = [
  {
    question: '¿Necesito experiencia?',
    answer: 'No, prácticas para todos los niveles.'
  },
  {
    question: '¿Puedo traer dispositivos?',
    answer: 'Alentamos la desconexión digital...'
  }
];

<Accordion items={faqItems} />
```

---

## 🌐 Estructura de Páginas

### Home Page (`pages/index.js`)
```jsx
import Head from 'next/head';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/sections/HeroSection';
import TimelineSection from '../components/sections/TimelineSection';
import PricingSection from '../components/sections/PricingSection';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>El Retiro | Retiro de Bienestar</title>
        <meta name="description" content="..." />
      </Head>
      <Navbar />
      <HeroSection />
      <TimelineSection />
      <PricingSection />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return { revalidate: 3600 }; // ISR - Revalidar cada hora
}
```

---

## ✅ Checklist de Desarrollo

### Fase 1: Setup
- [ ] Proyecto Next.js creado
- [ ] Tailwind y estilos configurados
- [ ] Estructura de carpetas lista

### Fase 2: Componentes Base
- [ ] Navbar responsiva
- [ ] Footer con contacto
- [ ] Estilos globales aplicados
- [ ] Prueba responsive en móvil

### Fase 3: Secciones
- [ ] Hero Section completa
- [ ] Timeline del día
- [ ] Carrusel de fotos (Location)
- [ ] Testimonios
- [ ] Precios
- [ ] FAQs

### Fase 4: SEO & Performance
- [ ] Meta tags en todas las páginas
- [ ] Sitemap generado
- [ ] Lighthouse score ≥90
- [ ] Imágenes optimizadas

### Fase 5: Testing
- [ ] Desktop responsive
- [ ] Tablet responsive
- [ ] Mobile responsive (375px)
- [ ] Navegadores: Chrome, Safari, Firefox
- [ ] Performance audit

---

## 🔗 Próximos Pasos

1. **Recolectar contenido**: Fotos/ilustraciones de El Retiro
2. **Redactar copys**: Títulos y descripciones en español
3. **Integración de contacto**: Configurar email para formularios
4. **Carrusel de imágenes**: Implementar con Embla o Swiper
5. **Sistema de reservas**: Futuro backend

---

## 📚 Recursos

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **React Icons**: https://react-icons.github.io/react-icons
- **Embla Carousel**: https://www.embla-carousel.com/

---

**¡Listos para crear El Retiro? Comienza con el setup en la Fase 1.** 🧘
