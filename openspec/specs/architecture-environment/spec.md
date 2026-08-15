# Arquitectura & Manejo de Entornos Specification

## Purpose
Establecer las directrices de arquitectura Jamstack/Next.js 15 App Router, segregación de variables de entorno y empaquetado optimizado en contenedor Docker.

## Requirements

### Requirement: Segregación de Variables de Entorno
Clasificar estrictamente las variables de entorno entre acceso público del cliente y secretos exclusivos del servidor.

#### Acceptance Criteria
- **Públicas (`NEXT_PUBLIC_`)**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_WHATSAPP_NUMBER` se compilan en el bundle cliente.
- **Secretos de Servidor (Sin prefijo)**: `CLOUDINARY_CLIENT_SECRET` y `SUPABASE_MANAGEMENT_PAT` **nunca** deben exponerse al cliente y se consultan únicamente en las API Routes de `/src/app/api/...`.

### Requirement: Salida Standalone para Docker
Configurar Next.js en modo de salida `standalone` en `next.config.ts` / `next.config.js`.

#### Acceptance Criteria
- La compilación `npm run build` genera un bundle ligero con dependencias mínimas listo para despliegue en contenedores Docker via `docker-compose up --build`.
