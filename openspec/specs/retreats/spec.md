# Retiros Programados & Ubicaciones Specification

## Purpose
Gestionar la consulta y visualización en tiempo real de los retiros holísticos agendados, mostrando el retiro activo más próximo con cuenta regresiva, estado de confirmación, enlace de ubicación a la galería y límite de cupos de participantes.

## Requirements

### Requirement: Consulta de Próximos Retiros & Cupos Limitados
El sistema debe consultar en Supabase la lista de retiros donde `end_date` sea mayor o igual a la fecha actual, ordenados cronológicamente por `start_date` ascendente.

#### Acceptance Criteria
- Si existen retiros confirmados, el más próximo se destaca visualmente en la sección principal con cuenta regresiva.
- Los retiros pendientes de confirmación (`is_confirmed = false`) muestran la etiqueta de estado `"Próximamente confirmamos"`.
- Se realizan consultas relacionales uniendo la tabla `retreats` con `locations`.
- Cada retiro puede incluir un límite de participantes `max_capacity` (INTEGER en Supabase), mostrando la insignia `"Cupos limitados a X personas"`.

### Requirement: Ubicaciones, Instrucciones & Galería
Cada retiro debe estar vinculado a una ubicación en la tabla `locations` que contenga nombre del complejo, dirección geográfica, enlace a Google Maps (`maps_url`) y enlace a su galería fotográfica (`gallery_url`).

#### Acceptance Criteria
- La información de dirección y mapa debe ser accesible desde la vista del retiro.
- El nombre del complejo u hotel debe enlazarse dinámicamente con la galería fotográfica del lugar (`gallery_url` o `/galeria`).
