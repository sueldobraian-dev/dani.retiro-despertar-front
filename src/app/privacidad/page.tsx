import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Retiro Despertar',
  description: 'Conoce cómo en Retiro Despertar protegemos y gestionamos tus datos personales de acuerdo con las políticas de privacidad y transparencia.',
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-stone-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-stone-200/80 space-y-8">
        <div>
          <Link
            href="/"
            className="text-xs uppercase tracking-wider text-emerald-800 hover:text-emerald-900 font-semibold mb-4 inline-block transition-colors"
          >
            ← Volver al inicio
          </Link>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-800">
            Política de Privacidad
          </h1>
          <p className="text-sm text-stone-500 mt-2">
            Última actualización: Agosto 2026
          </p>
        </div>

        <section className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base">
          <h2 className="text-xl font-serif font-semibold text-stone-800 border-b border-stone-200 pb-2">
            1. Compromiso de Privacidad
          </h2>
          <p>
            En <strong>Retiro Despertar</strong> valoramos la confianza de nuestros asistentes e interesados. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos la información personal proporcionada a través de nuestra web y canal de comunicación directa.
          </p>
        </section>

        <section className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base">
          <h2 className="text-xl font-serif font-semibold text-stone-800 border-b border-stone-200 pb-2">
            2. Información que Recopilamos
          </h2>
          <p>
            Recopilamos únicamente los datos necesarios para brindar asesoramiento e inscripciones en nuestras experiencias de retiro holístico:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Datos de contacto:</strong> Nombre completo, dirección de correo electrónico y número de teléfono móvil.</li>
            <li><strong>Preferencias e intereses:</strong> Disciplinas por las cuales consultas (Constelaciones Familiares, Reiki, Yoga) y mensajes opcionales enviadas en el formulario de inscripción.</li>
            <li><strong>Datos técnicos y cookies:</strong> Información anónima de navegación generada por herramientas analíticas para optimizar el rendimiento de la web.</li>
          </ul>
        </section>

        <section className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base">
          <h2 className="text-xl font-serif font-semibold text-stone-800 border-b border-stone-200 pb-2">
            3. Uso de la Información
          </h2>
          <p>
            La información recopilada se utiliza exclusivamente para:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Responder a tus consultas de pre-inscripción y coordinar tu reserva.</li>
            <li>Brindar detalles sobre la propuesta gastronómica del chef privado, accesos y horarios del retiro.</li>
            <li>Cumplir con los requerimientos técnicos y de seguridad exigidos por las plataformas publicitarias de Meta Ads y Google Ads.</li>
          </ul>
        </section>

        <section className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base">
          <h2 className="text-xl font-serif font-semibold text-stone-800 border-b border-stone-200 pb-2">
            4. Protección de Datos y Servicios de Terceros
          </h2>
          <p>
            No vendemos, alquilamos ni cedemos tus datos personales a terceros. Nuestra infraestructura utiliza servicios en la nube de alta seguridad (Supabase y Cloudinary) que aplican cifrado y políticas de Row Level Security (RLS) para evitar accesos no autorizados.
          </p>
        </section>

        <section className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base">
          <h2 className="text-xl font-serif font-semibold text-stone-800 border-b border-stone-200 pb-2">
            5. Derechos del Usuario y Contacto
          </h2>
          <p>
            Tienes derecho a solicitar la actualización, rectificación o eliminación de tus datos personales en cualquier momento. Si deseas realizar una consulta referente a tu privacidad, puedes comunicarte directamente con nuestro equipo por medio del canal oficial de WhatsApp o redes sociales.
          </p>
        </section>
      </div>
    </main>
  );
}
