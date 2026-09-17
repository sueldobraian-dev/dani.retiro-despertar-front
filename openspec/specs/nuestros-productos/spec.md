¿ # Spec: Nuestros Productos & Programa de Afiliados

## Purpose
Exhibir la selección de marcas y productos de alta calidad utilizados en la experiencia gastronómica y holística de Retiro Despertar (ej: Saint Gottard, Aromanza, aceites esenciales, etc.), permitiendo a las participantes adquirir estos artículos directamente a través de enlaces de afiliados de Mercado Libre y Amazon.

---

## Requirements

### Requirement: Catálogo de Productos y Selección de Marcas Destacadas
La sección debe presentar una lista curada de marcas y productos categorizados que reflejen la calidad premium de la gastronomía y las actividades de bienestar del retiro.

#### Acceptance Criteria
- Cada producto debe pertenecer a una categoría específica (ej: *"Tés e Infusiones"*, *"Aromaterapia e Inciensos"*, *"Ingredientes Gourmet"*, *"Cosmética Holística"*).
- Cada producto debe incluir:
  - Marca reconocida (ej: *Saint Gottard*, *Aromanza*).
  - Título descriptivo y detalle del producto.
  - Insignia o etiqueta de uso en el retiro (ej: *"Servido en el desayuno"*, *"Utilizado en sesión de Reiki"*, *"Selección del Chef"*).
  - Imagen representativa con contenedor de relación de aspecto (`aspect-square` u `object-cover`).
- Filtro interactivo de categorías por pestañas o botones para navegación fluida en dispositivos móviles y de escritorio.

---

### Requirement: Enlaces de Afiliados (Mercado Libre & Amazon)
Cada tarjeta de producto debe ofrecer opciones para comprar directamente en las plataformas de comercio electrónico mediante el programa de afiliados.

#### Acceptance Criteria
- Renderizado condicional de botones de compra según disponibilidad de enlaces:
  - Botón *"Comprar en Mercado Libre"* si existe `mercadolibre_url`.
  - Botón *"Comprar en Amazon"* si existe `amazon_url`.
- Todos los enlaces externos de afiliados deben configurarse obligatoriamente con `target="_blank"` y `rel="nofollow noopener noreferrer"`.
- Estilo diferenciado pero armónico con el diseño Zen para los botones de compra, manteniendo alta legibilidad e intención de clic.

---

### Requirement: Cumplimiento de Políticas Legal y SEO (Transparencia de Afiliados)
El sitio debe ser completamente transparente con las políticas de divulgación de afiliados para cumplir con Google Ads, Meta Ads y regulaciones de comercio electrónico.

#### Acceptance Criteria
- Presentar un banner o caja informativa clara (*Affiliate Disclaimer*) indicando:
  > *"Retiro Despertar participa en los programas de afiliados de Mercado Libre y Amazon. Si realizas una compra a través de nuestros enlaces, podemos recibir una pequeña comisión sin costo adicional para vos."*
- Metadatos SEO enriquecidos para la ruta `/productos`:
  - `title`: *"Nuestros Productos & Marcas de Gastronomía | Retiro Despertar"*
  - `description`: *"Descubrí las marcas de alta calidad que acompañan nuestros retiros holísticos. Tés gourmet Saint Gottard, aromaterapia Aromanza e ingredientes seleccionados."*
  - OpenGraph / Twitter Cards.
  - JSON-LD Structured Data (`ItemPage` / `ItemList`).

---

### Requirement: Diseño Responsivo y Estética Zen Mobile-First
El diseño de la vista `/productos` debe respetar el sistema de diseño visual de Retiro Despertar.

#### Acceptance Criteria
- Uso de paleta de colores orgánica (`bg-stone-50`, `bg-amber-50/40`, `text-stone-800`, `emerald-800`).
- Tarjetas con bordes suavizados (`rounded-2xl` o `rounded-3xl`) y sombras sutiles.
- Grilla responsiva adaptativa: 1 columna en móvil (`grid-cols-1`), 2 en tablet (`sm:grid-cols-2`), 3 en escritorio (`lg:grid-cols-3`).
- Performance optimizada con Next.js `<Image />` (`f_auto, q_auto`).
