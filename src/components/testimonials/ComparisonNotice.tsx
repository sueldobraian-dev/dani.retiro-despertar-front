import React from 'react';
import { Eye, HelpCircle } from 'lucide-react';

export default function ComparisonNotice() {
  return (
    <div className="bg-amber-50/70 border border-amber-200/70 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Eye className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-serif text-stone-800 font-bold text-base sm:text-lg flex items-center gap-2">
            Módulo Comparativo de Formatos de Video
          </h4>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed max-w-2xl">
            A continuación se presentan 2 carruseles consecutivos: primero el formato panorámico tradicional (<strong>16:9</strong>) y luego el formato vertical (<strong>Shorts 9:16</strong>). Podes interactuar, reproducir y likear ambos para evaluar cuál se adapta mejor a la identidad del Retiro Despertar.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 bg-amber-100/80 px-3.5 py-1.5 rounded-full self-start md:self-auto flex-shrink-0">
        <HelpCircle className="w-4 h-4" />
        Vista previa en evaluación
      </div>
    </div>
  );
}
