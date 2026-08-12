import React, { useState } from 'react';
import { FichaJurisprudencial } from '../types';
import { Bookmark, Search, Trash2, Eye, Scale, FileText, Calendar } from 'lucide-react';

interface FichasHistoryProps {
  fichas: FichaJurisprudencial[];
  onSelectFicha: (ficha: FichaJurisprudencial) => void;
  onDeleteFicha: (id: string) => void;
  onNewFicha: () => void;
}

export const FichasHistory: React.FC<FichasHistoryProps> = ({
  fichas,
  onSelectFicha,
  onDeleteFicha,
  onNewFicha,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCorporacion, setFilterCorporacion] = useState('TODAS');

  const filteredFichas = fichas.filter((f) => {
    const matchesSearch =
      f.identificacion.tipoYNumeroProvidencia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.identificacion.magistradoPonente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.ratioDecidendi.reglaGeneral.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.problemaJuridico.texto.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCorp =
      filterCorporacion === 'TODAS' ||
      f.identificacion.corporacion.toLowerCase().includes(filterCorporacion.toLowerCase());

    return matchesSearch && matchesCorp;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl text-slate-100">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Bookmark className="w-4 h-4" />
            <span>Biblioteca de Fichas Guardadas</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            Historial de Análisis Jurisprudenciales ({fichas.length})
          </h2>
        </div>

        <button
          onClick={onNewFicha}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          + Nueva Providencia
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por sentencia, magistrado, problema jurídico o ratio decidendi..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>

        <div>
          <select
            value={filterCorporacion}
            onChange={(e) => setFilterCorporacion(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            <option value="TODAS">Todas las Corporaciones</option>
            <option value="Corte Constitucional">Corte Constitucional</option>
            <option value="Corte Suprema">Corte Suprema de Justicia</option>
            <option value="Consejo de Estado">Consejo de Estado</option>
            <option value="Tribunal">Tribunales / Otros</option>
          </select>
        </div>

      </div>

      {/* Fichas Grid */}
      {filteredFichas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFichas.map((f) => (
            <div
              key={f.id}
              className="bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-xl p-5 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                    {f.identificacion.corporacion}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{f.identificacion.fecha || 'Sin fecha'}</span>
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-100 group-hover:text-amber-300 transition-colors mb-2">
                  {f.identificacion.tipoYNumeroProvidencia !== 'NO_INDICADO'
                    ? f.identificacion.tipoYNumeroProvidencia
                    : 'Ficha Jurisprudencial'}
                </h3>

                <p className="text-xs text-slate-400 mb-3 font-medium">
                  M.P. {f.identificacion.magistradoPonente}
                </p>

                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80 text-xs text-slate-300 mb-4 line-clamp-3">
                  <span className="font-semibold text-amber-400 block mb-1">Ratio Decidendi:</span>
                  {f.ratioDecidendi.reglaGeneral}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-500">
                  {f.citasRelevantes?.length || 0} citas • {f.salvamentosYAclaraciones?.length || 0} salvamentos
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onDeleteFicha(f.id)}
                    className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-lg transition-colors"
                    title="Eliminar de biblioteca"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectFicha(f)}
                    className="flex items-center space-x-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg border border-amber-500/30 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Abrir Ficha</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-950/40 rounded-xl border border-slate-800/60">
          <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-slate-300 font-bold text-sm">No se encontraron fichas jurisprudenciales</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            {searchTerm ? 'Intenta modificar la búsqueda.' : 'Aún no has guardado fichas. Analiza una providencia y haz clic en "Guardar Ficha".'}
          </p>
        </div>
      )}

    </div>
  );
};
