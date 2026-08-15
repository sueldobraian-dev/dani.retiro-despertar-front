# Base de Datos & Políticas RLS Specification

## Purpose
Definir la estructura del modelo relacional de datos en Supabase (`locations`, `retreats`, `registrations`) y aplicar políticas de seguridad a nivel de fila (Row Level Security - RLS) para proteger los datos personales de los usuarios mientras se habilita el acceso público a las fechas de retiros y ubicaciones.

## Requirements

### Requirement: Tabla `locations` (Ubicaciones)
Almacenar las ubicaciones físicas de los retiros para evitar duplicaciones de datos geográficos.

#### Schema
- `id`: `UUID` (Primary Key, autogenerado via `gen_random_uuid()`).
- `name`: `TEXT` (NOT NULL) - Nombre del complejo o recinto.
- `address`: `TEXT` (NOT NULL) - Dirección o zona geográfica visible.
- `maps_url`: `TEXT` (NOT NULL) - Enlace absoluto a Google Maps.
- `directions`: `TEXT` (Opcional) - Indicaciones de transporte o llegada paso a paso.
- `gallery_url`: `TEXT` (Opcional) - Enlace o fragmento hacia la galería fotográfica del lugar.
- `created_at`: `TIMESTAMPTZ` (Default `NOW()`).

#### Acceptance Criteria
- Habilitar RLS en `locations`.
- Política RLS: Permitir lectura pública (`FOR SELECT TO public USING (true)`).

---

### Requirement: Tabla `retreats` (Retiros Programados)
Mantener la agenda de retiros espirituales pasados y futuros asociados a una ubicación.

#### Schema
- `id`: `UUID` (Primary Key, autogenerado).
- `title`: `TEXT` (NOT NULL) - Título o nombre descriptivo del retiro.
- `start_date`: `DATE` (NOT NULL) - Fecha de inicio.
- `end_date`: `DATE` (NOT NULL) - Fecha de finalización.
- `location_id`: `UUID` (Foreign Key -> `locations.id` ON DELETE SET NULL).
- `is_confirmed`: `BOOLEAN` (Default `TRUE`) - Indica si la fecha está confirmada o en borrador.
- `status_text`: `TEXT` (Opcional) - Leyenda personalizada cuando `is_confirmed` es `false`.
- `max_capacity`: `INTEGER` (Default `9`) - Límite de cupos de participantes.
- `created_at`: `TIMESTAMPTZ` (Default `NOW()`).

#### Acceptance Criteria
- Habilitar RLS en `retreats`.
- Política RLS: Permitir lectura pública (`FOR SELECT TO public USING (true)`).

---

### Requirement: Tabla `registrations` (Pre-inscripciones)
Guardar la información de contacto enviada por los interesados a través del formulario de reserva.

#### Schema
- `id`: `UUID` (Primary Key, autogenerado).
- `full_name`: `TEXT` (NOT NULL) - Nombre y apellido del interesado.
- `email`: `TEXT` (NOT NULL) - Correo electrónico.
- `phone`: `TEXT` (NOT NULL) - Teléfono con código de país.
- `interest_discipline`: `TEXT` (NOT NULL) - Disciplina seleccionada ("Constelaciones", "Reiki", "Yoga", "Todas").
- `message`: `TEXT` (Opcional) - Consulta o mensaje personalizado.
- `created_at`: `TIMESTAMPTZ` (Default `NOW()`).

#### Acceptance Criteria
- Habilitar RLS en `registrations`.
- Política RLS de Inserción: Permitir únicamente inserción pública (`FOR INSERT TO public WITH CHECK (true)`).
- Privacidad RLS: Bloquear cualquier consulta de lectura pública (`SELECT`) sobre `registrations` para proteger datos sensibles de los usuarios.
