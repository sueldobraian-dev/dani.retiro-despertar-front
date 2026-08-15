# Formulario de Registro & Auto-Restore Specification

## Purpose
Permitir a los usuarios interesados enviar sus datos para pre-inscribirse en el retiro holístico de forma segura y resiliente ante posibles pausas de inactividad de Supabase.

## Requirements

### Requirement: Registro de Interesados
El usuario debe poder enviar su nombre completo, correo electrónico, teléfono con código de país, disciplina de interés y un mensaje opcional.

#### Acceptance Criteria
- Todos los campos obligatorios se validan antes del envío.
- La inserción en la tabla `registrations` respeta las políticas RLS permitiendo inserción pública (`INSERT`) pero no lectura (`SELECT`).
- Tras un envío exitoso, se notifica al usuario con un mensaje amigable de confirmación.

### Requirement: Resiliencia (Auto-Restore de Supabase)
Si el envío de registro falla por problemas de conexión a Supabase (debido a la pausa automática del tier gratuito), el cliente debe activar la rutina de recuperación automática.

#### Acceptance Criteria
- Se invoca la API Route `POST /api/supabase/restore`.
- La API Route realiza un request autenticado con PAT a la API de administración de Supabase (`https://api.supabase.com/v1/projects/{projectRef}/restore`).
- Se muestra un banner amigable informando que la base de datos se está reactivando y solicitando reintentar en unos segundos.
