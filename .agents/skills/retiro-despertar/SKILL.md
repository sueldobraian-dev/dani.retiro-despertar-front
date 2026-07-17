---
name: Retiro Despertar Frontend Developer
description: Guías de arquitectura, diseño mobile-first y reglas de negocio para el frontend de Retiro Despertar.
---
# Skill: Retiro Despertar Frontend Developer

Esta skill contiene las directrices, reglas de diseño, arquitectura de carpetas y lineamientos de negocio del proyecto **Retiro Despertar**.

## 📌 Guías y Referencias de Desarrollo

Para ver los detalles completos de cada área, consulta los documentos de referencia:

1. 🎯 **[Guía de Negocio y Objetivos (INSTRUCCIONES.md)](references/INSTRUCCIONES.md)**
   - Foco en Constelaciones Familiares, Reiki y Yoga.
   - Look & Feel orgánico, tonos tierra suaves, verdes secos y beige.
2. 📐 **[Estructura y Arquitectura (ARCHITECTURE.md)](references/ARCHITECTURE.md)**
   - Arquitectura modular basada en Next.js App Router.
   - Organización de componentes visuales de presentación y lógica.
3. 🎨 **[Diseño Frontend Moderno y Mobile-First (DESIGN_SKILL.md)](references/DESIGN_SKILL.md)**
   - Enfoque Mobile-First absoluto con Tailwind CSS.
   - Contenedores de escritorio limitados (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`).
   - Manejo responsivo y estético de imágenes usando `<Image />` con `fill` y contenedores con `aspect-ratio`.

## ⚙️ Reglas de Implementación Obligatorias

- **Mobile-First:** Las clases base de Tailwind CSS se aplican directamente al móvil sin prefijos. Los breakpoints (`md:`, `lg:`) se reservan para pantallas grandes.
- **Identidad Visual:** Utilizar tonos cálidos (`bg-stone-50`, `bg-amber-50/40`), textos legibles pero suaves (`text-stone-800`), formas redondeadas (`rounded-2xl` o `rounded-3xl`) y sombras sutiles.
- **Rendimiento:** Cargar imágenes críticas con `priority` y optimizarlas adecuadamente.
- **Sin Mocks de Datos:** En el caso que sea necesario simular datos de prueba, se deben utilizar archivos JSON dentro de la carpeta `data` y mockear las respuestas en los servidores serverless.
- **Seguridad en Formularios (RLS):** Toda inserción de datos personales (como en `registrations`) debe respetar la política RLS en Supabase: permitir inserción pública (`INSERT`) pero restringir lectura pública (`SELECT`).
- **Manejo de Resiliencia (Auto-Restore):** Si una transacción a Supabase falla en el cliente (debido a la pausa de inactividad de 2 días del tier gratuito), el código debe invocar el endpoint POST `/api/supabase/restore` para despertar el proyecto y solicitar de forma amigable al usuario que reintente en unos segundos.
- **Responsabilidad Única y Flujos Declarativos:** Las funciones deben tener una única responsabilidad clara. Para evitar estructuras extensas de `if-else` o `switch` repetitivos, se debe favorecer el uso del **Patrón de Estrategia (Strategy / Dispatch Maps)** mapeando condiciones o claves directamente a funciones ejecutoras, manteniendo el código limpio y declarativo.
