import React from 'react';
import { Scale, FileText, Bookmark, GitCompare, CheckCircle2, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'nuevo' | 'historial' | 'comparador' | 'reglas';
  setActiveTab: (tab: 'nuevo' | 'historial' | 'comparador' | 'reglas') => void;
  fichasCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, fichasCount }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('nuevo')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-md shadow-amber-900/30 ring-2 ring-amber-400/20">
              <Scale className="w-6 h-6 text-slate-950 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-bold text-lg text-slate-100 tracking-tight leading-none">
                  Analista Jurisprudencial
                </h1>
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Colombia
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Extracción de Fichas Técnicas • Técnica de Precedente de Altas Cortes
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('nuevo')}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'nuevo'
                  ? 'bg-red-600 text-white font-semibold shadow-md shadow-red-600/20'
                  : 'text-slate-300 hover:bg-red-900/40 hover:text-red-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Nueva Ficha</span>
            </button>

            <button
              onClick={() => setActiveTab('historial')}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'historial'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Biblioteca ({fichasCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('comparador')}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'comparador'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              <span className="hidden sm:inline">Línea & Comparador</span>
              <span className="sm:hidden">Comparar</span>
            </button>

            <button
              onClick={() => setActiveTab('reglas')}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'reglas'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline">Reglas Operativas</span>
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
};
