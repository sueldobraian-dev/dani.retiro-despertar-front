# OpenSpec Tasks: Mejoras en Sección Próximos Retiros (Galería de Ubicación y Límite de Cupos)

## Contexto & Objetivo
Definir las tareas previas a la implementación para extender la sección `UpcomingRetreatsSection` y la base de datos en Supabase, permitiendo que:
1. La ubicación de cada retiro se enlace dinámicamente con la galería fotográfica del lugar (`gallery_url`).
2. Se muestre la restricción de cupos máximos por retiro (ej: `"Cupos limitados a 9 personas"`), configurando por defecto `max_capacity = 9`.
3. Se agreguen las columnas correspondientes en las tablas de Supabase (`locations` y `retreats`), actualizando scripts DDL con los datos reales de migración y tipos TypeScript.

---

## Tareas de Implementación (Task Breakdown)

### 1. Base de Datos & DDL SQL (Supabase)
- [x] **Modificar `docs/create_retreats_table.sql`**:
  - Columna `gallery_url TEXT` agregada a la tabla `locations`.
  - Columna `max_capacity INTEGER DEFAULT 9` agregada a la tabla `retreats`.
  - Inserción de datos reales en `INSERT INTO locations`:
    - *Finca los Coipos*: `address`: `'Chascomús, Buenos Aires'`, `gallery_url`: `'/galeria#retiro-despertar/chascomus-finca-los-coipos/retiro-despertar/chascomus-finca-los-coipos'`, `directions`: `'Tomar Autovía 2 hasta el km 134.5, la entrada es a 25mts de la ruta. Ingreso directamente desde ruta 2'`.
    - *Complejo Minahasa*: `address`: `'Tigre, Buenos Aires (Delta)'`, `gallery_url`: `'/galeria#retiro-despertar/tigre-delta-minahasa/retiro-despertar/tigre-delta-minahasa/'`, `directions`: `'Se llega mediante lancha colectiva "Línea Interisleña" desde la Estación Fluvial de Tigre (Muelle 1).'`.
  - Inserción de retiros con `max_capacity` seteado en `9` por defecto.

### 2. Tipado TypeScript & Interfaces
- [x] **Actualizar definiciones de tipos en el proyecto**:
  - Extender la interfaz `Location` agregando `gallery_url?: string`.
  - Extender la interfaz `Retreat` agregando `max_capacity?: number`.
  - Ejecutar verificación de tipos con `npx tsc --noEmit`.

### 3. Componente `UpcomingRetreats` (`src/components/UpcomingRetreats.tsx`)
- [ ] **Vincular Ubicación con Galería**:
  - Convertir el texto/badge de ubicación en un enlace interactivo (`<Link href={location.gallery_url || '/galeria'}>`) con estilos hover amigables y accesibles.
- [ ] **Mostrar Etiqueta de Cupos Limitados**:
  - Diseñar e insertar la insignia de capacidad (ej: `"Cupos limitados a 9 personas"` si `max_capacity` es 9).
- [ ] **Diseño Responsivo & Estética Zen**:
  - Garantizar coherencia Mobile-First con la paleta del sitio (`emerald-800`, `stone-700`, `rounded-2xl`).

### 4. Actualización de Documentación & Especificaciones
- [x] Actualizar [openspec/specs/retreats/spec.md](file:///d:/Repositories/dani/dani.retiro-despertar-front/openspec/specs/retreats/spec.md) con las especificaciones de `gallery_url` y `max_capacity = 9`.
- [x] Actualizar [openspec/specs/database-schema/spec.md](file:///d:/Repositories/dani/dani.retiro-despertar-front/openspec/specs/database-schema/spec.md) incluyendo las columnas `gallery_url` y `max_capacity`.

### 5. Verification & Testing
- [ ] Actualizar los mocks y tests unitarios en [src/components/__tests__/UpcomingRetreats.test.tsx](file:///d:/Repositories/dani/dani.retiro-despertar-front/src/components/__tests__/UpcomingRetreats.test.tsx) comprobando el enlace a la galería y la etiqueta de cupos.
- [ ] Correr la suite de pruebas unitarias (`npx vitest run`).
- [ ] Comprobar el tipado estricto (`npx tsc --noEmit`).
