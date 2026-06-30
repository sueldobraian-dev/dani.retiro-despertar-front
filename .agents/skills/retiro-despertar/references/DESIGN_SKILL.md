# Skill: Diseño Frontend Moderno, Mobile-First y Experiencia de Usuario Holística

Esta guía define las reglas de diseño, maquetación y estilizado que debe seguir la inteligencia artificial y el desarrollador al construir interfaces para este proyecto. El objetivo es lograr una UI pulida, fluida y con un rendimiento excepcional.

## 1. Filosofía Mobile-First Absoluta

El desarrollo se realiza pensando en el dispositivo móvil como la pantalla principal, escalando progresivamente hacia monitores de escritorio.

- **Regla de Escritura de Clases:** Las clases base de Tailwind CSS se aplican directamente al móvil sin prefijos (ej. `p-4`, `text-xl`, `flex-col`, `w-full`).
- **Escalabilidad Progresiva:** Los breakpoints se usan exclusivamente para reordenar o expandir el diseño en pantallas grandes (ej. `md:p-8`, `md:text-3xl`, `md:flex-row`).
- **Contenedores de Escritorio:** Para evitar que la landing page se estire infinitamente en monitores anchos, el contenedor principal de la página siempre debe llevar un límite de ancho máximo y estar centrado: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.

## 2. Identidad Visual y Look & Feel (Retiros Espirituales)

Para transmitir bienestar, paz y introspección (Yoga, Reiki, Constelaciones), se utilizará una estética orgánica y minimalista.

- **Paleta de Colores Teórica (Basada en Tailwind):**
  - *Fondos:* Tonos cálidos y suaves (`bg-stone-50`, `bg-amber-50/40`, `bg-white`). Evitar grises fríos o negros puros.
  - *Textos:* Alta legibilidad pero suaves al ojo (`text-stone-800` para títulos principales, `text-stone-600` para descripciones).
  - *Acentos (Naturaleza/Energía):* Verdes secos, lavandas o dorados apagados (`text-emerald-800`, `bg-emerald-700`, `text-amber-700`).
- **Formas y Sombras:**
  - Bordes muy suavizados para dar sensación de amabilidad: `rounded-2xl` o `rounded-3xl` en tarjetas y carruseles.
  - Sombras imperceptibles y limpias: `shadow-sm` o `shadow-md/50` mezcladas con bordes sutiles `border border-stone-100`.

## 3. Manejo de Imágenes y Layouts Responsivos

Las imágenes son el núcleo emocional del sitio y deben verse perfectas en cualquier resolución.

- **Fórmula de Imagen Responsiva Impecable (Next.js):**
  Para que una foto llene su espacio en móvil y escritorio sin deformarse ni estirarse, el componente `<Image />` siempre debe seguir este patrón estructural:
  ```tsx
  <div className="relative w-full aspect-square md:aspect-video rounded-2xl overflow-hidden">
    <Image alt="Descripción" className="object-cover" fill priority={isHero} src="/images/tu-foto.jpg"/>
  </div>
  ```
