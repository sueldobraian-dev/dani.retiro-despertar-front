/**
 * Helper utilitario para generar URLs y gestionar aperturas parametrizadas de WhatsApp.
 */

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5492212007660';

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hola! Me interesa formar parte de la experiencia Retiro Despertar. ¿Me contás cómo puedo avanzar?';

/**
 * Genera la URL codificada de WhatsApp con mensaje parametrizado.
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const text = customMessage || DEFAULT_WHATSAPP_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Abre una ventana/pestaña directa hacia WhatsApp con un mensaje parametrizado.
 */
export function openWhatsApp(customMessage?: string) {
  if (typeof window !== 'undefined') {
    const url = getWhatsAppUrl(customMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
