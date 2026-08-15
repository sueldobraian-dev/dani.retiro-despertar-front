import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Retiro Despertar',
  description: 'Consulta los términos y condiciones de participación, reservas, políticas de cancelación, uso de imagen y descargo de responsabilidad para las experiencias de Retiro Despertar.',
};

export default function TerminosPage() {
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
            Términos y Condiciones
          </h1>
          <p className="text-sm text-stone-500 mt-2">
            Última actualización: Agosto 2026
          </p>
        </div>

        <section className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base">
          <h2 className="text-xl font-serif font-semibold text-stone-800 border-b border-stone-200 pb-2">
            1. Descripción de la Experiencia
          </h2>
          <p>
            <strong>Retiro Despertar</strong> es un evento holístico orientado al bienestar personal, la introspección y la reconexión integral. Combina talleres y dinámicas de <em>Constelaciones Familiares</em>, armonización con <em>Reiki</em>, prácticas de <em>Yoga</em> adaptadas a todos los niveles y un servicio de alimentación consciente elaborado por un <em>chef privado</em>.
          </p>
        </section>

        <section className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base border-l-4 border-emerald-700 pl-4 py-1 bg-emerald-50/50 rounded-r-xl">
          <h2 className="text-xl font-serif font-semibold text-stone-800">
            2. Descargo de Responsabilidad sobre Salud y Bienestar (Google Ads & Meta Policy)
          </h2>
          <p>
            Las actividades, talleres y prácticas dictadas en el marco del Retiro Despertar tienen carácter exclusivamente holístico, formativo y de desarrollo personal.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nuestras disciplinas <strong>no constituyen ni reemplazan</strong> tratamientos médicos, diagnósticos clínicos ni terapias psicológicas profesionales.</li>
            <li>Si el asistente padece alguna condición de salud física o mental previa, debe informar a la organización y consultar previamente con su profesional médico tratante.</li>
          </ul>
        </section>

        <section className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base">
          <h2 className="text-xl font-serif font-semibold text-stone-800 border-b border-stone-200 pb-2">
            3. Reserva, Seña y Condiciones de Pago
          </h2>
          <p>
            Para garantizar tu participación en el retiro, se aplican las siguientes pautas de pago:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Se reserva el lugar con una seña del <strong>20% del valor total de la inversión</strong>.</li>
            <li>El saldo restante se puede abonar hasta <strong>72 horas antes</strong> del inicio del retiro.</li>
          </ul>
        </section>

        <section className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base">
          <h2 className="text-xl font-serif font-semibold text-stone-800 border-b border-stone-200 pb-2">
            4. Políticas de Cancelación y Reembolso
          </h2>

          <h3 className="font-semibold text-stone-800 pt-2">Cancelación por motivos personales del asistente:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Si cancelas tu reserva con <strong>un mes o más de anticipación</strong> al inicio del retiro, te reintegramos el <strong>100% de lo abonado</strong>.</li>
            <li>Si cancelas con <strong>menos de un mes de anticipación</strong>, no habrá reembolso de ningún tipo.</li>
            <li>Si no puedes llegar al retiro debido a circunstancias imprevistas externas (tales como huelgas, contingencias climáticas, vuelos perdidos, retrasados o cancelados), el depósito del retiro <strong>no es reembolsable</strong>.</li>
          </ul>

          <h3 className="font-semibold text-stone-800 pt-2">Llegadas tardías o salidas anticipadas:</h3>
          <p>
            Si llegas tarde al retiro o necesitas retirarte temprano por cualquier motivo, no ofrecemos ningún reembolso por el tiempo restante de tu estadía.
          </p>

          <h3 className="font-semibold text-stone-800 pt-2">Cancelación por parte de la Organización:</h3>
          <p>
            Si por alguna razón la organización debe cancelar el retiro, reintegraremos el <strong>100% de los abonos</strong> que hayas realizado.
          </p>
        </section>

        <section className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base">
          <h2 className="text-xl font-serif font-semibold text-stone-800 border-b border-stone-200 pb-2">
            5. Registro Audiovisual y Uso de Imagen
          </h2>
          <p>
            Al participar del <strong>Retiro Despertar</strong>, la persona asistente autoriza el registro de imágenes y/o videos durante las actividades, los cuales podrán ser utilizados con fines de comunicación, difusión del retiro y futuras ediciones.
          </p>
          <p>
            <em>Nota importante:</em> Quien no desee aparecer en los registros audiovisuales deberá informarlo previamente a la organización.
          </p>
        </section>

        <section className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base">
          <h2 className="text-xl font-serif font-semibold text-stone-800 border-b border-stone-200 pb-2">
            6. Normas de Convivencia y Respeto
          </h2>
          <p>
            Para preservar el ambiente de calma y cuidado mutuo, los participantes se comprometen a mantener un trato respetuoso hacia el grupo, los facilitadores, el personal gastronómico y las instalaciones naturales del complejo.
          </p>
        </section>
      </div>
    </main>
  );
}
