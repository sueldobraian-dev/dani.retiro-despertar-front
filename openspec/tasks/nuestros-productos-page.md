# OpenSpec Tasks: Nueva Página /productos ("Nuestros Productos & Afiliados")

## Contexto & Objetivo
Definir la hoja de ruta y desglose de tareas para desarrollar la nueva página `/productos` ("Nuestros Productos").
La finalidad principal es destacar la alta calidad de los productos e ingredientes presentes en la propuesta gastronómica y de bienestar del retiro (marcas premium como *Saint Gottard*, *Aromanza*, entre otras).
En segundo lugar, se busca monetizar la recomendación de estos productos integrando el programa de afiliados de **Mercado Libre** y **Amazon Afiliados**.

---

## Tareas de Especificación e Implementación (Task Breakdown)

### 1. Modelado de Datos y Catálogo (`src/types/product.ts`, `src/data/products.json`, `src/lib/productUtils.ts`)
- [ ] **Definición de Tipos (`src/types/product.ts`)**:
  - Crear interfaces `ProductCategory`, `AffiliateLinks`, `Brand`, `Product`.
  - Campos: `id`, `name`, `brand`, `category`, `description`, `usageBadge` (ej: *"Servido en el retiro"*), `imageUrl`, `affiliateLinks` (`mercadolibre_url`, `amazon_url`), `isFeatured`.
- [ ] **Creación del Dataset Inicial (`src/data/products.json`)**:
  - Incluir marcas clave:
    - **Saint Gottard**: Infusiones de hierbas gourmet, Té Verde con Jazmín, Manzanilla y Miel.
    - **Aromanza**: Inciensos orgánicos de sagrada madre/aromanza, Sahumerios artesanalmente aromatizados para meditación y Reiki.
    - **Aceites Esenciales Holísticos**: Lavanda y Eucaliptus para aromaterapia.
    - **Ingredientes Gastronómicos**: Harinas orgánicas, frutos secos y especias de chef.
- [ ] **Utilidades de Filtrado y Formateo (`src/lib/productUtils.ts`)**:
  - Funciones `getProductsByCategory`, `getFeaturedBrands`, `getAffiliateButtonProps`.
- [ ] **Pruebas Unitarias (`src/lib/__tests__/productUtils.test.ts`)**:
  - Testear filtrado por categoría, extracción de marcas y validación de links de afiliados.

---

### 2. Componentes Modulares de Productos (`src/components/products/`)
- [ ] **`ProductsHero.tsx`**:
  - Encabezado con estética Zen (`font-serif`, `emerald-800`, `stone-50`) que explique el propósito de la selección gastronómica y de bienestar.
- [ ] **`BrandShowcase.tsx`**:
  - Carrusel / marquesina interactiva destacando los logos y nombres de las marcas aliadas (*Saint Gottard*, *Aromanza*, etc.).
- [ ] **`ProductCategoryFilter.tsx`**:
  - Selector de categorías mobile-first con botones de tipo pill/badge para filtrar sin recargar la página.
- [ ] **`ProductCard.tsx`**:
  - Tarjeta de producto responsiva con imagen optimizada (`Next/Image`), marca, título, descripción, badge de uso en el retiro y botones CTAs de compra (*"Comprar en Mercado Libre"* / *"Comprar en Amazon"* con `rel="nofollow noopener noreferrer"`).
- [ ] **`AffiliateDisclaimer.tsx`**:
  - Banner informativo de transparencia conforme a las políticas de publicidad y de la FTC / Google Ads / Meta Ads.

---

### 3. Ruta de Next.js & Integración de Navegación (`src/app/productos/page.tsx`, `Header.tsx`)
- [ ] **Crear Ruta `/productos` (`src/app/productos/page.tsx`)**:
  - Ensamblar la página uniendo `ProductsHero`, `BrandShowcase`, `ProductCategoryFilter`, la grilla de `ProductCard` y `AffiliateDisclaimer`.
  - Configurar metadatos SEO completos (`title`, `description`, OpenGraph, Twitter Cards, canonical URL).
  - Incluir estructuración Schema.org (`ItemList` / `ItemPage`).
- [ ] **Actualizar Header & Navegación (`src/components/Header.tsx`)**:
  - Agregar la opción **"Nuestros Productos"** (`/productos`) en `NAV_ITEMS` para navegación desktop y menú desplegable móvil.
- [ ] **Actualizar Footer (`src/components/Footer.tsx`)**:
  - Incluir el enlace hacia `/productos` en la sección de navegación secundaria.

---

### 4. Cumplimiento SEO, Accesibilidad y Políticas Publicitarias
- [ ] Asegurar descargo legal explícito visible en el pie del catálogo.
- [ ] Verificar que todos los atributos `alt` de las imágenes de productos sean descriptivos.
- [ ] Garantizar enlaces seguros `rel="nofollow noopener noreferrer"` en los botones de afiliados para no penalizar el SEO orgánico del sitio.

---

### 5. Pruebas Unitarias y Comprobación Estática
- [ ] **Pruebas Unitarias de Componentes UI**:
  - `ProductCard.test.tsx`: Verificar renderizado de badges, imágenes y botones de afiliados condicionales.
  - `ProductCategoryFilter.test.tsx`: Verificar cambio de categoría activa al hacer clic.
  - `Header.test.tsx`: Confirmar presencia del nuevo enlace a `/productos`.
- [ ] **Ejecución del Test Suite**:
  - Ejecutar `npx vitest run`.
  - Ejecutar verificación de tipos TypeScript `npx tsc --noEmit`.
