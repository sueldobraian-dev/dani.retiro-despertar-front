# OpenSpec Tasks: Nueva Página /experiencia y Mutación de Enlaces de Galería/Experiencia

## Contexto & Objetivo
Definir las tareas y especificaciones para la creación de la nueva página `/experiencia`, la estandarización de enlaces reutilizables de ubicaciones (`gallery_url` y `experience_url`), la modularización de componentes escalables de experiencia y las pestañas adhesivas (*sticky*) superiores.

### Requerimientos Clave:
1. **Nueva Ruta `/experiencia` & Arquitectura Modular**:
   - Selector de pestañas adhesivo (`sticky top-[73px]`) para mantener visibles las cápsulas durante el scroll.
   - Componentización bajo `src/components/experience/`:
     - **`ExperienceNavTabs.tsx`**: Pestañas de navegación adhesivas superiores (*sticky*).
     - **`QuienesSomosCapsule.tsx`**: Cápsula principal con las 2 fotos exclusivas (`facilitators_vero_nancy.jpg` y `organizer_dani.jpg`).
     - **`ChascomusCapsule.tsx`**: Cápsula de Finca Los Coipos (actividades, programa Día 1 y 2, cupones parametrizados para WhatsApp y galería).
     - **`DeltaCapsule.tsx`**: Cápsula de Complejo Minahasa (edición Delta y aviso de nueva fecha).
     - **`src/types/experience.ts`**: Definición de interfaces para escalabilidad futura de nuevas ubicaciones de retiros.

2. **Reutilización de Enlaces (`locationUrls`)**:
   - `gallery_url` muta a una ruta unificada reutilizable para Galería y Experiencia.
   - Enlace Galería: `/galeria#retiro-despertar/chascomus-finca-los-coipos`
   - Enlace Experiencia: `/experiencia#retiro-despertar/chascomus-finca-los-coipos`

3. **Mensajes de WhatsApp Parametrizados en Todo el Sitio (`whatsapp.ts`)**:
   - Módulo centralizado `src/lib/whatsapp.ts` para construir URLs de WhatsApp con mensajes personalizados y códigos de cupón según el contexto.

---

## Tareas de Especificación e Implementación (Task Breakdown)

### 1. Utilidades y Helpers (`src/lib/locationUrls.ts`, `src/lib/whatsapp.ts`, `src/types/experience.ts`)
- [x] Crear funciones de extracción y formateo de slugs: `extractLocationSlug`, `getGalleryUrl`, `getExperienceUrl`.
- [x] Crear helper de mensajes parametrizados de WhatsApp: `getWhatsAppUrl`, `openWhatsApp`.
- [x] Crear tipos e interfaces de experiencia en `src/types/experience.ts`.
- [x] Pruebas unitarias en `src/lib/__tests__/locationUrls.test.ts` y `src/lib/__tests__/whatsapp.test.ts`.

### 2. Componentes Modulares de Experiencia (`src/components/experience/`)
- [x] **`ExperienceNavTabs.tsx`**: Navegación de cápsulas con comportamiento *sticky top*.
- [x] **`QuienesSomosCapsule.tsx`**: Presentación del equipo con fotos de Vero & Nancy y Dani.
- [x] **`ChascomusCapsule.tsx`**: Finca Los Coipos con actividades, cronograma y cupones.
- [x] **`DeltaCapsule.tsx`**: Complejo Minahasa Delta.
- [x] **`ExperienceContent.tsx`**: Orquestador principal de las cápsulas y manejo de hash en la URL.

### 3. Integración en Componentes del Sitio
- [x] **`Header.tsx`**: Ruta "La Experiencia" apuntando a `/experiencia`.
- [x] **`HeroOverview.tsx`**: Dirección dinámica del botón "Próximo Retiro" a la cápsula `/experiencia#...`.
- [x] **`UpcomingRetreats.tsx`**: Botones "Ver Experiencia", "Ver Galería" y consulta parametrizada por WhatsApp.
- [x] **`WhatsAppFloat.tsx`**: Evento `open-whatsapp` con detalle de mensaje personalizado.

### 4. Pruebas Unitarias & Validación Estática
- [x] Pruebas unitarias para `ExperienceContent.test.tsx`.
- [x] Verificación de la suite completa de tests (`npx vitest run`).
