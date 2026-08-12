import React, { useState } from 'react';
import { FichaJurisprudencial } from '../types';
import { GitCompare, Scale, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

interface PrecedentComparatorProps {
  fichas: FichaJurisprudencial[];
}

export const PrecedentComparator: React.FC<PrecedentComparatorProps> = ({ fichas }) => {
  const [selectedId1, setSelectedId1] = useState<string>(fichas[0]?.id || '');
  const [selectedId2, setSelectedId2] = useState<string>(fichas[1]?.id || fichas[0]?.id || '');

  const ficha1 = fichas.find((f) => f.id === selectedId1);
  const ficha2 = fichas.find((f) => f.id === selectedId2);

  if (fichas.length < 2) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-300">
        <GitCompare className="w-12 h-12 text-amber-400 mx-auto mb-3" />
        <h3 className="font-bold text-lg text-white">Comparador de Precedentes & Línea Jurisprudencial</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto mt-2">
          Para realizar una comparación comparativa de líneas jurisprudenciales (evoluciòn de Ratio Decidendi o cambios de postura entre Altas Cortes), necesitas al menos 2 fichas analizadas o guardadas.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl text-slate-100 space-y-6">
      
      {/* Title */}
      <div>
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <GitCompare className="w-4 h-4" />
          <span>Análisis Comparativo de Línea Jurisprudencial</span>
        </div>
        <h2 className="text-2xl font-bold text-white mt-1">
          Comparador de Precedentes Judiciales
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Enfrente dos providencias para contrastar el problema jurídico, la regla abstracta de la Ratio Decidendi y los giros jurisprudenciales.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Providencia 1 */}
        <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30">
          <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            Providencia A (Base de Precedente):
          </label>
          <select
            value={selectedId1}
            onChange={(e) => setSelectedId1(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            {fichas.map((f) => (
              <option key={f.id} value={f.id}>
                {f.identificacion.tipoYNumeroProvidencia} - {f.identificacion.corporacion} ({f.identificacion.fecha})
              </option>
            ))}
          </select>
        </div>

        {/* Providencia 2 */}
        <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30">
          <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            Providencia B (Precedente Subsecuente / Análogo):
          </label>
          <select
            value={selectedId2}
            onChange={(e) => setSelectedId2(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            {fichas.map((f) => (
              <option key={f.id} value={f.id}>
                {f.identificacion.tipoYNumeroProvidencia} - {f.identificacion.corporacion} ({f.identificacion.fecha})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Comparative Matrix */}
      {ficha1 && ficha2 && (
        <div className="space-y-6">
          
          {/* 1. Datos Identificadores */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
              1. Identificación y Ponentes
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="font-bold text-slate-100 block">{ficha1.identificacion.tipoYNumeroProvidencia}</span>
                <span className="text-slate-400 block mt-1">{ficha1.identificacion.corporacion} • {ficha1.identificacion.fecha}</span>
                <span className="text-amber-300 block mt-1">M.P. {ficha1.identificacion.magistradoPonente}</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="font-bold text-slate-100 block">{ficha2.identificacion.tipoYNumeroProvidencia}</span>
                <span className="text-slate-400 block mt-1">{ficha2.identificacion.corporacion} • {ficha2.identificacion.fecha}</span>
                <span className="text-amber-300 block mt-1">M.P. {ficha2.identificacion.magistradoPonente}</span>
              </div>
            </div>
          </div>

          {/* 2. Problemas Jurídicos */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
              2. Problemas Jurídicos Planteados
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-200">
                {ficha1.problemaJuridico.texto}
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-200">
                {ficha2.problemaJuridico.texto}
              </div>
            </div>
          </div>

          {/* 3. Ratio Decidendi */}
          <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/40">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3">
              3. Contraste de Ratio Decidendi (Regla Jurídica)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900 p-3 rounded-lg border border-amber-500/20 text-slate-100 font-medium">
                <span className="text-[10px] font-bold text-amber-400 block uppercase mb-1">Regla Providencia A:</span>
                {ficha1.ratioDecidendi.reglaGeneral}
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-amber-500/20 text-slate-100 font-medium">
                <span className="text-[10px] font-bold text-amber-400 block uppercase mb-1">Regla Providencia B:</span>
                {ficha2.ratioDecidendi.reglaGeneral}
              </div>
            </div>
          </div>

          {/* 4. Resuelve */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
              4. Sentido de la Decisión
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 whitespace-pre-wrap">
                {ficha1.decisionResuelve}
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 whitespace-pre-wrap">
                {ficha2.decisionResuelve}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
