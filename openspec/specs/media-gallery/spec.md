# Integración Multimedia Cloudinary Specification

## Purpose
Proporcionar acceso dinámico y optimizado a las galerías fotográficas del retiro holístico a través de Cloudinary y una API Route proxy segura en Next.js.

## Requirements

### Requirement: API Route Proxy (`/api/gallery`)
Servir de proxy seguro para consultar los recursos de Cloudinary sin exponer claves privadas o secretos del servidor al navegador del cliente.

#### Acceptance Criteria
- La ruta `/api/gallery` debe autenticar solicitudes del servidor hacia Cloudinary.
- Soporta consultas por Tag (ej: "Gastronomía", "Actividades") consumiendo las listas públicas JSON de Cloudinary (`https://res.cloudinary.com/{cloudName}/image/list/{tag}.json`).
- Soporta consultas por Carpeta/Ubicación física filtrando por la ruta relativa del SDK de Cloudinary.

### Requirement: Optimización y Lazy Loading
Las imágenes generadas deben utilizar transformaciones automáticas de formato y calidad (`f_auto,q_auto`).

#### Acceptance Criteria
- El componente `MediaGallery` implementa carga diferida (Lazy Loading) e integración con Lightbox para explorar imágenes a pantalla completa.
- Las imágenes críticas del Hero o vistas principales deben llevar la propiedad `priority` para evitar variaciones acumulativas del diseño (CLS).
