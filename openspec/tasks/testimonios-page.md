# Tasks: Implementación de Página de Testimonios y Sistema de Likes

## 1. Base de Datos Supabase & Dataset de Resiliencia
- [x] Crear script SQL DDL `docs/create_testimonials_table.sql` con definición de tabla `testimonials` (columnas no nulas polimórficas `title` y `content`, `subtitle` opcional), índices, RLS y funciones RPC `increment_testimonial_like` y `decrement_testimonial_like`.
- [x] Insertar semillas con testimonios reales y de prueba (incluyendo video `cIjc8wOTLwk` y short `TSQ96WksY9w`).
- [x] Crear `src/data/testimonials.json` con el dataset de contingencia local adaptado a `title` y `content`.

## 2. Tipado y Capa de Acceso a Datos
- [x] Actualizar `src/types/index.ts` con interfaces `Testimonial` (`title`, `content`, `subtitle`), `TestimonialType`, `LikeState`.
- [x] Crear `src/lib/youtube.ts` con utilidades para extraer IDs de videos y shorts de YouTube y generar URLs de embed / thumbnails.
- [x] Crear `src/lib/testimonials.ts` con funciones:
  - `fetchWrittenTestimonials({ offset, limit })`
  - `fetchTopLikedWrittenTestimonials(limit = 4)`
  - `fetchVideoTestimonials(type: 'video' | 'short')`
  - `toggleLikeTestimonial(id: string, currentlyLiked: boolean)`
  - `getLocalLikedIds()`, `setLocalLikedIds(ids: string[])`
- [x] Escribir tests unitarios en `src/lib/__tests__/testimonials.test.ts` y `src/lib/__tests__/youtube.test.ts`.

## 3. Componentes de Testimonios
- [x] Crear `src/components/testimonials/LikeHeartButton.tsx` (ícono de corazón, toggle optimista, persistencia en localStorage, sin contador visible).
- [x] Crear `src/components/testimonials/WrittenTestimonialCard.tsx` (tarjeta zen con rating, avatar/iniciales, texto y corazón).
- [x] Crear `src/components/testimonials/WrittenTestimonialsCarousel.tsx` (carrusel dinámico con paginación de 10 en 10 acumulativa).
- [x] Crear `src/components/testimonials/VideoPlayerModal.tsx` o visor embebido responsivo para YouTube.
- [x] Crear `src/components/testimonials/VideoCarousel16x9.tsx` con video *Atardecer en la laguna*.
- [x] Crear `src/components/testimonials/ShortsCarousel9x16.tsx` con Short *Testimonio 1 - Retiro Despertar*.
- [x] Crear `src/components/testimonials/ComparisonNotice.tsx` con guía visual para el usuario.

## 4. Actualización de la Home & Navegación
- [x] Modificar `src/components/Header.tsx` para que el enlace "Testimonios" dirija a `/testimonios`, actualizando IntersectionObserver y mobile menu.
- [x] Modificar `src/components/FeedbackCarousel.tsx` en la Home para cargar el Top 4 más gustados desde Supabase/fallback y cambiar el botón a *"Ver más testimonios"* con enlace a `/testimonios`.

## 5. Nueva Ruta `/testimonios`
- [x] Crear `src/app/testimonios/page.tsx` estructurando Hero, Carrusel de Escritos, Carrusel de Videos 16:9, Carrusel de Shorts 9:16 y CTA de reserva.
- [x] Configurar metadatos SEO completos (OpenGraph, Twitter Cards, Schema.org).

## 6. Pruebas Unitarias y Verificación
- [x] Actualizar tests existentes en `src/components/__tests__/Header.test.tsx` y `src/components/__tests__/FeedbackCarousel.test.tsx`.
- [x] Crear tests para los nuevos componentes en `src/components/testimonials/__tests__/`.
- [x] Ejecutar `npx vitest run` y `npx tsc --noEmit`.
