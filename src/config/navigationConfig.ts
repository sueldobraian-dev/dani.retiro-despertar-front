export type NavItemType = 'scroll' | 'page';

export interface NavItemConfig {
  id: string;
  label: string;
  path: string;
  type: NavItemType;
  enabled: boolean;
}

export type HomeSectionId = 'inicio' | 'experiencia' | 'proximos-retiros' | 'beneficios' | 'testimonios';

export interface HomeSectionConfig {
  id: HomeSectionId;
  enabled: boolean;
}

export type ExperienceNavigationMode = 'continuous-scroll' | 'tabs';

/**
 * Configuración declarativa del orden de bloques en el scroll principal (Home `/`).
 * Reordenar o desactivar elementos aquí modifica automáticamente el flujo de la página principal.
 */
export const HOME_SCROLL_SECTIONS: HomeSectionConfig[] = [
  { id: 'inicio', enabled: true },
  { id: 'experiencia', enabled: true },
  { id: 'proximos-retiros', enabled: true },
  { id: 'beneficios', enabled: true },
  { id: 'testimonios', enabled: true },
];

/**
 * Ítems de navegación principal para el Header.
 * - `type: 'scroll'` hace smooth-scroll cuando el usuario está en `/` y es observado por `useScrollSpy`.
 * - `type: 'page'` navega a una ruta dedicada (`/experiencia`, `/galeria`, `/testimonios`).
 */
export const NAV_ITEMS_CONFIG: NavItemConfig[] = [
  { id: 'inicio', label: 'Inicio', path: '/', type: 'scroll', enabled: true },
  { id: 'experiencia', label: 'La Experiencia', path: '/experiencia', type: 'page', enabled: true },
  { id: 'proximos-retiros', label: 'Próximos Retiros', path: '/#proximos-retiros', type: 'scroll', enabled: true },
  { id: 'beneficios', label: 'Beneficios', path: '/#beneficios', type: 'scroll', enabled: true },
  { id: 'galeria', label: 'Galería', path: '/galeria', type: 'page', enabled: true },
  { id: 'testimonios', label: 'Testimonios', path: '/testimonios', type: 'page', enabled: true },
  {
    id: 'indumentaria',
    label: 'Indumentaria',
    path: '/despierta-indumentaria-holistica',
    type: 'page',
    enabled: true,
  },
];

export const ACTIVE_NAV_ITEMS: NavItemConfig[] = NAV_ITEMS_CONFIG.filter((item) => item.enabled);

/**
 * Modo de navegación por defecto dentro de `/experiencia`:
 * - `'continuous-scroll'`: Muestra todas las cápsulas apiladas verticalmente y sincroniza las pestañas al scrollear.
 * - `'tabs'`: Muestra únicamente la cápsula activa al hacer clic.
 */
export const DEFAULT_EXPERIENCE_NAV_MODE: ExperienceNavigationMode = 'tabs';

