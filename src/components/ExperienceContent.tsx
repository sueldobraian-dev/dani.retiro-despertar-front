'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { CapsuleNavConfig, CapsuleTab } from '@/types/experience';
import ExperienceNavTabs from '@/components/experience/ExperienceNavTabs';
import QuienesSomosCapsule from '@/components/experience/QuienesSomosCapsule';
import ChascomusCapsule from '@/components/experience/ChascomusCapsule';
import DeltaCapsule from '@/components/experience/DeltaCapsule';

export const CAPSULES: CapsuleNavConfig[] = [
  {
    id: 'quienes-somos',
    label: 'Quiénes Somos',
    shortLabel: 'Quiénes Somos',
    hash: 'quienes-somos',
    subtitle: 'Nuestra esencia y equipo',
    iconType: 'users',
  },
  {
    id: 'chascomus-finca-los-coipos',
    label: 'Finca Los Coipos (Chascomús)',
    shortLabel: 'Finca Los Coipos',
    hash: 'retiro-despertar/chascomus-finca-los-coipos',
    subtitle: 'Naturaleza y caballos',
    iconType: 'trees',
  },
  {
    id: 'tigre-delta-minahasa',
    label: 'Complejo Minahasa (Tigre - Delta)',
    shortLabel: 'Minahasa Delta',
    hash: 'retiro-despertar/tigre-delta-minahasa',
    subtitle: 'Paz sobre el río',
    iconType: 'waves',
  },
];

export default function ExperienceContent() {
  const [activeTab, setActiveTab] = useState<CapsuleTab>('quienes-somos');

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (!hash) return;

      if (hash.includes('chascomus') || hash.includes('finca-los-coipos')) {
        setActiveTab('chascomus-finca-los-coipos');
      } else if (hash.includes('tigre') || hash.includes('minahasa') || hash.includes('delta')) {
        setActiveTab('tigre-delta-minahasa');
      } else if (hash.includes('quienes-somos') || hash.includes('equipo')) {
        setActiveTab('quienes-somos');
      }

      const container = document.getElementById('experiencia-content');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabChange = (tab: CapsuleNavConfig) => {
    setActiveTab(tab.id);
    window.history.pushState(null, '', `#${tab.hash}`);
  };

  return (
    <div id="experiencia-content" className="py-8 sm:py-14 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Principal */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider bg-emerald-100/70 text-emerald-900 border border-emerald-200/50 mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> La Experiencia Despertar
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-stone-800 tracking-tight font-bold">
            Un Viaje al Centro del Alma
          </h1>
          <p className="text-stone-600 mt-3 sm:mt-4 text-sm sm:text-lg leading-relaxed">
            Explora nuestra identidad, nuestro equipo de facilitadoras y los espacios sagrados pensados para tu desconexión y renovación integral.
          </p>
        </div>

      </div>

      {/* Cápsulas / Pestañas Superiores Sticky Compactas */}
      <ExperienceNavTabs
        capsules={CAPSULES}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Renderizado modular de cápsulas */}
        {activeTab === 'quienes-somos' && <QuienesSomosCapsule />}
        {activeTab === 'chascomus-finca-los-coipos' && <ChascomusCapsule />}
        {activeTab === 'tigre-delta-minahasa' && <DeltaCapsule />}
      </div>
    </div>
  );
}
