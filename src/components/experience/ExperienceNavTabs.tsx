'use client';

import React from 'react';
import { Users, Trees, Waves } from 'lucide-react';
import { CapsuleNavConfig, CapsuleTab } from '@/types/experience';

interface ExperienceNavTabsProps {
  capsules: CapsuleNavConfig[];
  activeTab: CapsuleTab;
  onTabChange: (tab: CapsuleNavConfig) => void;
}

export default function ExperienceNavTabs({
  capsules,
  activeTab,
  onTabChange,
}: ExperienceNavTabsProps) {
  return (
    <div className="sticky top-[61px] sm:top-[73px] z-40 py-2 mb-6 sm:mb-8 pointer-events-none transition-all duration-300">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex justify-center">
        <div className="pointer-events-auto flex items-center overflow-x-auto max-w-full flex-nowrap gap-1.5 sm:gap-2 p-1.5 bg-stone-50/80 backdrop-blur-md rounded-full border border-stone-200/80 shadow-lg shadow-stone-900/5 overflow-y-hidden scrollbar-none">
          {capsules.map((cap) => {
            const isActive = activeTab === cap.id;
            return (
              <button
                key={cap.id}
                onClick={() => onTabChange(cap)}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap cursor-pointer flex-shrink-0 ${
                  isActive
                    ? 'bg-emerald-800 text-stone-50 shadow-md shadow-emerald-950/20'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                {cap.iconType === 'users' && <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />}
                {cap.iconType === 'trees' && <Trees className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />}
                {cap.iconType === 'waves' && <Waves className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />}
                <span className="sm:hidden">{cap.shortLabel || cap.label}</span>
                <span className="hidden sm:inline">{cap.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
