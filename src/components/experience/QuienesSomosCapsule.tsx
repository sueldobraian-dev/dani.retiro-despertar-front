'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, ShieldCheck, Sparkles } from 'lucide-react';

export type TeamBadgeVariant = 'emerald' | 'purple' | 'amber';

export interface TeamMemberBioParagraph {
  highlight?: string;
  text: string;
}

export interface TeamMember {
  id: string;
  name: string;
  subtitle: string;
  badgeText: string;
  badgeVariant?: TeamBadgeVariant;
  imageSrc: string;
  imageAlt: string;
  imageScale?: number;
  imageOrigin?: string;
  paragraphs: TeamMemberBioParagraph[];
}

const BADGE_STYLES: Record<TeamBadgeVariant, { badgeBg: string; subtitleText: string }> = {
  emerald: {
    badgeBg: 'bg-emerald-800/90 text-stone-50',
    subtitleText: 'text-emerald-800',
  },
  purple: {
    badgeBg: 'bg-purple-900/90 text-stone-50',
    subtitleText: 'text-purple-900',
  },
  amber: {
    badgeBg: 'bg-amber-800/90 text-stone-50',
    subtitleText: 'text-amber-800',
  },
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'vero-nancy',
    name: 'Vero & Nancy',
    subtitle: 'Facilitadoras de Procesos & Armonización',
    badgeText: 'Facilitadoras',
    badgeVariant: 'emerald',
    imageSrc: '/images/team/facilitators-vero-nancy.jpeg',
    imageAlt: 'Facilitadoras: Vero y Nancy',
    paragraphs: [
      {
        highlight: 'Verónica Laura Mora:',
        text: 'Facilitadora de procesos de sanación y conciencia desde el enfoque cuántico y sistémico. Más de 9 años de experiencia en Constelaciones Familiares, LNT (Sanación Cuántica), Registros Akáshicos, Reiki y Tameana.',
      },
      {
        highlight: 'Nancy Román:',
        text: 'Guía espacios de conexión corporal y armonización emocional a través de Yoga, Flores de Bach y Reiki, sosteniendo el proceso desde la suavidad y el equilibrio entre cuerpo, emoción y energía.',
      },
    ],
  },
  {
    id: 'caro',
    name: 'Caro',
    subtitle: 'Carolina Basualdo',
    badgeText: 'Facilitadora',
    badgeVariant: 'emerald',
    imageSrc: '/images/team/facilitator-caro.jpg',
    imageAlt: 'Facilitadora: Caro (Carolina Basualdo)',
    imageScale: 1.3,
    imageOrigin: '28% 55%',
    paragraphs: [
      {
        text: 'Hace siete años inició un profundo camino espiritual y de sanación personal que, con la magia de la vida, la llevó a acompañar a otros en su propio despertar y autoconocimiento. Desde hace dos años guía procesos a través de distintas herramientas terapéuticas, haciendo realidad una vocación de servicio sentida desde la infancia, siempre desde el amor, la presencia y el respeto.',
      },
    ],
  },
  {
    id: 'dani',
    name: 'Dani',
    subtitle: 'Daniela Belén García Cabrera',
    badgeText: 'Organizadora',
    badgeVariant: 'purple',
    imageSrc: '/images/team/organizer-dani.jpeg',
    imageAlt: 'Organizadora: Dani',
    paragraphs: [
      {
        text: 'Licenciada en Administración y organizadora de Despertar. Este retiro nace de un proceso personal real: el deseo de compartir, con respeto y autenticidad, las herramientas que fueron claves en mi propio camino de despertar espiritual. Acompaño creando un espacio cuidado, coherente y profundamente humano.',
      },
    ],
  },
];

export function TeamMemberCard({ member }: { member: TeamMember }) {
  const variant = member.badgeVariant || 'emerald';
  const styles = BADGE_STYLES[variant];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300">
      <div>
        <div className="w-full aspect-[3/4] relative rounded-2xl overflow-hidden mb-6 bg-stone-100 shadow-sm">
          <Image
            src={member.imageSrc}
            alt={member.imageAlt}
            fill
            className="object-cover transition-transform duration-300"
            style={{
              transform: member.imageScale ? `scale(${member.imageScale})` : undefined,
              transformOrigin: member.imageOrigin || 'center center',
            }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
          <div
            className={`absolute bottom-4 left-4 ${styles.badgeBg} text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm`}
          >
            {member.badgeText}
          </div>
        </div>
        <h4 className="text-2xl font-serif font-bold text-stone-800">
          {member.name}
        </h4>
        <span
          className={`block text-xs font-semibold ${styles.subtitleText} uppercase tracking-wider mt-1 mb-4`}
        >
          {member.subtitle}
        </span>
        <div className="space-y-3 text-stone-600 text-xs sm:text-sm leading-relaxed">
          {member.paragraphs.map((p, idx) => (
            <p key={idx}>
              {p.highlight && <strong>{p.highlight} </strong>}
              {p.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export interface QuienesSomosCapsuleProps {
  members?: TeamMember[];
  memberIds?: string[];
}

export default function QuienesSomosCapsule({
  members = TEAM_MEMBERS,
  memberIds,
}: QuienesSomosCapsuleProps) {
  const visibleMembers = memberIds
    ? members.filter((m) => memberIds.includes(m.id))
    : members;

  const gridColsClass =
    visibleMembers.length === 2
      ? 'grid-cols-1 md:grid-cols-2 max-w-5xl'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl';

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Manifestación / Filosofía */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/60 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-emerald-800 font-semibold uppercase text-xs tracking-wider">
            Nuestra Esencia
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-stone-800 font-bold leading-snug">
            Una pausa para quienes están cansad@s de sostenerlo todo
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-normal">
            Despertar es un espacio seguro para frenar, sentir y soltar cargas. A través de experiencias corporales y emocionales profundas, el retiro acompaña un proceso de reconexión interna para volver a tu vida con más liviandad, claridad y coherencia con tu deseo.
          </p>
          <div className="pt-4 border-t border-stone-100 flex flex-wrap justify-center gap-6 text-xs sm:text-sm text-stone-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-emerald-700" /> Presencia y Cuidado
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" /> Espacio Contenido
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" /> Transformación Cuántica
            </span>
          </div>
        </div>
      </div>

      {/* Equipo: Tarjetas dinámicas componetizadas */}
      <div>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-serif font-bold text-stone-800">
            Nuestro Equipo
          </h3>
          <p className="text-stone-500 text-sm mt-1">
            Facilitadoras y organizadora dedicadas a sostener tu espacio de sanación
          </p>
        </div>

        <div className={`grid ${gridColsClass} gap-8 mx-auto`}>
          {visibleMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
