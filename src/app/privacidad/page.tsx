import React from 'react';
import type { Metadata } from 'next';
import BackButton from '@/components/BackButton';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Retiro Despertar',
  description: 'Conoce cómo en Retiro Despertar protegemos y gestionamos tus datos personales de acuerdo con las políticas de privacidad y transparencia.',
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-stone-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-stone-200/80 space-y-8">
        <div>
          <BackButton label="Volver" fallbackUrl="/" />
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
            3. Finalidad del Uso de los Datos
          </h2>
          <p>
            Toda información recopilada se utiliza exclusivamente para:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Confirmar y gestionar la reserva de plazas en los retiros.</li>
            <li>Enviar detalles logísticos, cronogramas e indicaciones de llegada antes del evento.</li>
            <li>Coordinar menús personalizados con nuestro chef privado según las necesidades de los participantes.</li>
            <li>Responder dudas e inquietudes de forma personalizada a través de canales directos de comunicación.</li>
          </ul>
        </section>

        <section className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base">
          <h2 className="text-xl font-serif font-semibold text-stone-800 border-b border-stone-200 pb-2">
            4. No Divulgación a Terceros
          </h2>
          <p>
            <strong>Retiro Despertar</strong> no vende, alquila ni cede bajo ninguna circunstancia los datos personales de sus usuarios a terceros con fines comerciales ni publicitarios.
          </p>
        </section>
      </div>
    </main>
  );
}
