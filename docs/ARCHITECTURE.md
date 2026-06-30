# Arquitectura del Proyecto y Estructura de Directorios

El proyecto utiliza **Next.js App Router** y sigue un patrón de arquitectura modular y limpio para separar la lógica de negocio de los componentes visuales de presentación.

## 📁 Estructura de Directorios Planteada

```text
├── docs/                     # Documentación técnica y del negocio
│   ├── INSTRUCCIONES.md
│   └── ARCHITECTURE.md
├── public/                   # Recursos estáticos globales
│   └── images/               # Fotos del retiro, avatares y fondos
├── src/
│   ├── app/                  # Enrutamiento y páginas (App Router)
│   │   ├── layout.tsx        # Layout global (HTML, Meta, Fuentes, Providers)
│   │   └── page.tsx          # Página principal (Overview / Landing)
│   ├── components/           # Componentes modulares y reutilizables
│   │   ├── ui/               # Componentes atómicos o de diseño base (Botones, inputs)
│   │   ├── HeroOverview.tsx  # Sección principal con texto e imagen destacada
│   │   ├── ImageCarousel.tsx # Carrusel de fotos de la experiencia (experiencia visual)
│   │   ├── FeedbackCarousel.tsx # Testimonios de participantes
│   │   └── FormRegister.tsx  # Formulario de conversión e inscripción
│   ├── types/                # Definiciones de tipos e interfaces de TypeScript
│   │   └── index.ts          # Tipos para Feedbacks, Imágenes y Formularios
│   └── styles/               # Configuración de estilos globales
│       └── globals.css       # Directivas de Tailwind CSS
├── package.json
├── tailwind.config.ts        # Configuración personalizada de Tailwind
└── tsconfig.json