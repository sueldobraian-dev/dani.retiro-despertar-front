# Header & Navegación Specification

## Purpose
Proporcionar una cabecera limpia, responsiva y accesible con navegación por secciones, branding con el ícono `DespertarIcon`, enlaces a redes sociales y CTA de contacto por WhatsApp.

## Requirements

### Requirement: Branding & Ícono Despertar
El header debe mostrar el logo del proyecto combinando el ícono `DespertarIcon` (sol naciente a medio salir sobre horizonte/ojo con rayos finos) y el texto `"Retiro Despertar"`.

#### Acceptance Criteria
- Al hacer hover sobre el logo, el ícono cambia suavemente de color (`emerald-800` a `stone-50`) e incrementa sutilmente su escala.
- Al hacer click en el logo desde la home, desplaza suavemente la vista hasta la sección `#inicio`.

### Requirement: Navegación Responsiva
La navegación debe presentar enlaces a las secciones principales ("Inicio", "La Experiencia", "Próximos Retiros", "Galería", "Testimonios").

#### Acceptance Criteria
- En pantallas móviles (menos de `md`), la navegación se repliega en un menú hamburguesa desplegable.
- La sección activa se resalta visualmente mediante IntersectionObserver en la Home page.
- El botón "Contactanos" emite el evento global `open-whatsapp` para desplegar la conversación.
