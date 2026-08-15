# SEO & Publicidad (Google Ads / Meta Ads) Compliance Specification

## Purpose
Establecer las reglas de cumplimiento técnico y legal requeridas por Google Ads, Meta Ads (Facebook/Instagram) y los motores de búsqueda para garantizar máxima aprobabilidad de campañas publicitarias y un posicionamiento SEO excelente.

## Requirements

### Requirement: Páginas Legales y Enlaces Permanentes
El sitio debe proporcionar páginas accesibles públicamente para la Política de Privacidad (`/privacidad`) y los Términos y Condiciones (`/terminos`).

#### Acceptance Criteria
- El componente `Footer` debe incluir enlaces visibles y accesibles a `/privacidad` y `/terminos`.
- Las páginas de privacidad y términos deben renderizarse sin errores y seguir el diseño orgánico Zen de la plataforma.

### Requirement: Transparencia y Descargo de Responsabilidad de Salud (Health Disclaimer)
Las actividades holísticas (Yoga, Reiki, Constelaciones Familiares) deben describirse con transparencia sin promesas engañosas ni garantías médicas.

#### Acceptance Criteria
- En los Términos y Condiciones se incluye una cláusula explícita aclarando que el retiro ofrece experiencias de bienestar y desarrollo personal sin diagnosticar ni reemplazar tratamientos médicos o psicológicos profesionales.
- Los formularios de contacto informan al usuario sobre el tratamiento protegido de sus datos personales.

### Requirement: SEO Técnico, OpenGraph y JSON-LD
La plataforma debe implementar metadatos completos y datos estructurados Schema.org.

#### Acceptance Criteria
- `RootLayout` incluye `metadataBase`, `title`, `description`, `keywords`, `openGraph` y `twitter`.
- Se inyecta script de datos estructurados JSON-LD (`Organization`, `Event`) para enriquecer los snippets en motores de búsqueda.
- La jerarquía de etiquetas HTML5 mantiene un único `<h1>` por página y atributos `alt` descriptivos en todas las imágenes.
