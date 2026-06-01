# 🧘 Skill: El Retiro Despertar

## Descripción
Skill completa para desarrollar la landing page de "El Retiro" — un retiro holístico de bienestar con Next.js, diseño mobile-first y estética hand-drawn.

---

## 📁 Contenido de la Skill

```
.claude/skills/retiro-despertar/
├── SKILL.md                    # 📘 Documentación principal
├── README.md                   # 📖 Guía de uso de templates
├── INDEX.md                    # 📋 Este archivo
└── templates/
    ├── _app.jsx               # Setup de fuentes globales
    ├── index.jsx              # Página home completa (ejemplo)
    ├── Navbar.jsx             # Barra de navegación
    ├── Button.jsx             # Componente botón reutilizable
    ├── Badge.jsx              # Componente badge
    ├── Accordion.jsx          # FAQs expandibles
    ├── HeroSection.jsx        # Sección hero
    ├── TimelineSection.jsx    # Timeline del día
    ├── TimelineItem.jsx       # Item del timeline
    ├── PricingSection.jsx     # Sección de precios
    ├── variables.css          # Variables CSS (colores, tipografía)
    ├── globals.css            # Estilos globales
    ├── tailwind.config.js     # Configuración Tailwind
    └── package.json           # Dependencias recomendadas
```

---

## 🎯 Cómo Usar Esta Skill

### Opción 1: Interactiva (Recomendado)
Usa la skill en el chat para obtener ayuda durante el desarrollo:

```
/retiro-despertar
```

**Invoca la skill cuando:**
- Necesites ayuda con componentes específicos
- Tengas dudas sobre responsive design
- Requieras revisar el diseño contra el wireframe
- Necesites optimizar para móvil

### Opción 2: Manual
Copia los templates según necesites:

1. Crea la estructura de carpetas en tu proyecto
2. Copia los archivos de `templates/`
3. Referencia SKILL.md para arquitectura y diseño
4. Consulta README.md para instrucciones de setup

---

## 🚀 Roadmap Resumido

| Fase | Duración | Tareas |
|------|----------|--------|
| **1. Setup** | 1-2h | Crear proyecto, instalar dependencias, estructura de carpetas |
| **2. Layout Base** | 2h | Navbar, Footer, estilos globales, responsive |
| **3. Secciones** | 4-5h | Hero, Timeline, Carrusel, Testimonios, Precios, FAQs |
| **4. SEO & Performance** | 1-2h | Meta tags, Sitemap, Lighthouse score ≥90 |
| **5. Testing** | 1-2h | Desktop, tablet, móvil, navegadores |
| **6. Deploy** | 0.5h | Vercel deployment |

---

## 📱 Principios de Diseño

✅ **Mobile-First** — Diseña para 375px primero
✅ **Hand-Drawn** — Ilustraciones artesanales, no fotos glossy
✅ **Responsive** — 375px (mobile), 768px (tablet), 1024px (desktop)
✅ **Accesible** — WCAG 2.1 AA
✅ **Optimizado** — Lighthouse ≥90

---

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Terracota (Primary) | #A0826D | Headings, CTAs, accents |
| Sage Green (Secondary) | #9CAF88 | Botones, timeline, badges |
| Dorado (Accent) | #D4AF37 | Precios, detalles premium |
| Crema (Light) | #F5F1EB | Fondos, espacios |
| Charcoal (Text) | #2B2B2B | Párrafos principales |
| Gray (Text Light) | #666 | Descripciones, meta |

---

## 📋 Secciones de la Landing Page

1. **Hero** — Portada con imagen de fondo + CTA
2. **Timeline** — "Un día en El Retiro" (horarios con actividades)
3. **Lugar** — Carrusel de imágenes del espacio
4. **Testimonios** — Cards con experiencias de usuarios
5. **Value Prop** — 4 boxes (hospedaje, alimentación, actividades, desconexión)
6. **Precios** — Early Bird vs Regular
7. **FAQs** — Accordion con 5-7 preguntas
8. **Footer** — Contacto + redes sociales

---

## 🔗 Recursos de Templates

| Archivo | Propósito | Usa cuando |
|---------|-----------|-----------|
| `_app.jsx` | Setup global | Configurar fuentes y contexto |
| `Navbar.jsx` | Navegación | Empezar layout |
| `HeroSection.jsx` | Portada | Primera sección visible |
| `TimelineSection.jsx` | Timeline | Mostrar actividades del día |
| `PricingSection.jsx` | Precios | Cards de planes |
| `Accordion.jsx` | FAQs | Responder preguntas |
| `Button.jsx` | CTAs | Cualquier botón de acción |
| `tailwind.config.js` | Estilos | Aplicar colores custom |

---

## ✅ Checklist Rápido

- [ ] Proyecto Next.js con Tailwind
- [ ] Estructura de carpetas creada
- [ ] Variables CSS aplicadas
- [ ] Navbar responsive
- [ ] Hero section implementada
- [ ] Timeline completo
- [ ] Precios visibles
- [ ] FAQs funcionando
- [ ] Mobile responsive (375px)
- [ ] Lighthouse audit ≥90
- [ ] Deploy en Vercel

---

## 🎓 Próximas Mejoras Futuras

1. **Carrusel de imágenes** — Implementar con Embla
2. **Formulario de contacto** — API endpoint
3. **Sistema de reservas** — Integración con backend
4. **Blog** — Prácticas de bienestar
5. **Multilingual** — Español + inglés
6. **Animations** — Scroll triggers, parallax
7. **Dark Mode** — Tema oscuro opcional

---

**Creada**: 2026-06-01 | **Última actualización**: 2026-06-01
**Desarrollador responsable**: Tu equipo

---

💡 **Tip**: Usa esta skill para mantener coherencia con el diseño durante todo el desarrollo. Referencia SKILL.md cuando tengas dudas sobre arquitectura o diseño.
