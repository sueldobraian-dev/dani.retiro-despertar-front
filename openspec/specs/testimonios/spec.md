# Spec: Página de Testimonios & Feedback Multimedia

## Purpose
Ofrecer un espacio dedicado (`/testimonios`) para exhibir vivencias transformadoras de los participantes de Retiro Despertar mediante testimonios escritos y registros testimoniales en video (YouTube), permitiendo interacción afectiva ("likes" con ícono de corazón sin contador) y facilitando el acceso desde el menú principal y la página de inicio.

---

## Requirements

### Requirement: Navegación Global desde el Header
El ítem "Testimonios" del menú principal debe navegar directamente a la ruta dedicada `/testimonios`.

#### Acceptance Criteria
- En `Header.tsx`, `NAV_ITEMS` debe asociar `id: 'testimonios'` con `path: '/testimonios'`.
- Al hacer clic en desktop o en el menú móvil, se debe realizar una navegación fluida a `/testimonios` (sin intentar scroll ancla en la Home).
- Cuando `pathname === '/testimonios'`, el ítem debe mostrar el estado activo subrayado (`emerald-800`).

---

### Requirement: Modelo de Datos en Supabase y Políticas RLS
Los testimonios deben persistirse en la base de datos Supabase en la tabla `testimonials`.

#### Schema
- `id`: `UUID PRIMARY KEY DEFAULT gen_random_uuid()`
- `name`: `TEXT NOT NULL`
- `role`: `TEXT` (ej. "Participante de Constelaciones", "Practicante de Yoga")
- `comment`: `TEXT` (requerido para testimonios escritos)
- `avatar_url`: `TEXT` (opcional)
- `rating`: `INTEGER DEFAULT 5`
- `type`: `TEXT NOT NULL CHECK (type IN ('written', 'video', 'short'))`
- `video_url`: `TEXT` (URL completa o ID de YouTube)
- `video_title`: `TEXT` (Título descriptivo del video)
- `likes_count`: `INTEGER NOT NULL DEFAULT 0`
- `is_published`: `BOOLEAN NOT NULL DEFAULT true`
- `created_at`: `TIMESTAMPTZ NOT NULL DEFAULT now()`

#### Acceptance Criteria
- Habilitar RLS en `testimonials` con política de lectura pública `FOR SELECT TO public USING (is_published = true)`.
- Crear funciones Postgres `increment_testimonial_like(testimonial_id UUID)` y `decrement_testimonial_like(testimonial_id UUID)` con `SECURITY DEFINER` para mutar `likes_count` de forma controlada sin exponer actualización arbitraria a la tabla.
- Proporcionar dataset de contingencia local en `src/data/testimonials.json` ante pausas de inactividad de Supabase.

---

### Requirement: Interacción de "Like" (Ícono de Corazón sin Contador)
Cada testimonio (escrito o en video) debe incluir un botón de corazón para que los usuarios expresen su gratitud o afinidad.

#### Acceptance Criteria
- El botón debe mostrar un ícono de corazón (`Heart` de `lucide-react`).
- **No debe mostrar el número de likes** bajo ninguna circunstancia.
- El estado visual debe alternar entre inactivo (`text-stone-400 hover:text-rose-500`) y activo (`text-rose-500 fill-rose-500`).
- La selección del usuario debe recordarse localmente en `localStorage` (`retiro_liked_testimonials`) para que al recargar conserve su estado.
- Actualización optimista inmediata en la interfaz mientras se envía la llamada a Supabase/RPC.

---

### Requirement: Carrusel Paginado Progresivo de Testimonios Escritos
Los testimonios escritos deben mostrarse en un carrusel interactivo que consulte lotes de a 10 registros y crezca dinámicamente.

#### Acceptance Criteria
- Carga inicial: primeros 10 testimonios ordenados por `likes_count DESC, created_at DESC`.
- Navegación táctil en mobile (`overflow-x-auto snap-x`) y controles de anterior/siguiente.
- Al avanzar hacia el final del lote actual, se consulta la siguiente tanda de 10 registros y se anexan a la lista existente sin resetear la posición del carrusel.
- Indicador sutil de carga cuando se esté solicitando una nueva página de testimonios.
- Diseño de tarjeta zen: tipografía Serif para nombres, estrellas doradas, comentario en cursiva suave y botón de corazón.

---

### Requirement: Doble Carrusel de Videos de YouTube (16:9 Tradicional vs 9:16 Shorts)
La página `/testimonios` debe presentar dos carruseles verticales apilados para contrastar estéticas y formatos de video.

#### Acceptance Criteria
- **Carrusel 1 (Videos 16:9)**:
  - Tarjetas horizontales con contenedor `aspect-video rounded-2xl overflow-hidden`.
  - Debe incluir el video inicial: *"Atardecer en la laguna"* (`https://www.youtube.com/watch?v=cIjc8wOTLwk`).
  - Thumbnail de alta calidad con overlay de reproducción y modal/reproductor responsivo sin fugas de rendimiento.
  - Título, autor y botón de corazón para likear.
- **Carrusel 2 (Shorts 9:16)**:
  - Tarjetas verticales esbeltas con contenedor `aspect-[9/16] max-w-[260px] rounded-2xl overflow-hidden`.
  - Debe incluir el Short inicial: *"Testimonio 1 - Retiro Despertar"* (`https://www.youtube.com/shorts/TSQ96WksY9w`).
  - Título, autor y botón de corazón para likear.
- Ambos carruseles deben contar con encabezados claros que permitan evaluar la experiencia visual y tomar una decisión fundada.

---

### Requirement: Sección de Testimonios en la Home (Top 4 Más Gustados)
El componente de testimonios en la página principal (`/`) debe actualizarse para mostrar únicamente los 4 testimonios con más likes.

#### Acceptance Criteria
- Consulta a Supabase filtrando por `is_published = true`, ordenando por `likes_count DESC, created_at DESC` con límite `.limit(4)`.
- Renderizado de 4 tarjetas con el mismo botón de "like" por corazón (sin contador).
- El botón de llamado a la acción debe decir *"Ver más testimonios"* y dirigir hacia `/testimonios`.
