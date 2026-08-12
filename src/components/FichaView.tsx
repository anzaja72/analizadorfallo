import React, { useState } from 'react';
import { FichaJurisprudencial } from '../types';
import { generateMarkdownText } from '../utils/storage';
import { Copy, Check, Save, Printer, Download, ShieldCheck, FileText, LayoutGrid, AlertTriangle, Scale, Quote, BookOpen, ChevronRight, Edit3 } from 'lucide-react';

interface FichaViewProps {
  ficha: FichaJurisprudencial;
  onSave: (ficha: FichaJurisprudencial) => void;
  onOpenRulesModal: () => void;
  isSaved?: boolean;
}

export const FichaView: React.FC<FichaViewProps> = ({ ficha, onSave, onOpenRulesModal, isSaved = false }) => {
  const [viewMode, setViewMode] = useState<'text' | 'interactive'>('text');
  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(isSaved);
  const [editableFicha, setEditableFicha] = useState<FichaJurisprudencial>(ficha);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const markdownContent = generateMarkdownText(editableFicha);

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToLibrary = () => {
    onSave(editableFicha);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ficha_${editableFicha.identificacion.tipoYNumeroProvidencia.replace(/[^a-zA-Z0-9]/g, '_') || 'Providencia'}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Action Header & View Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Ficha Jurisprudencial Producida</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            {editableFicha.identificacion.tipoYNumeroProvidencia !== 'NO_INDICADO'
              ? editableFicha.identificacion.tipoYNumeroProvidencia
              : 'Ficha Jurisprudencial Extraída'}
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            {editableFicha.identificacion.corporacion} • M.P. {editableFicha.identificacion.magistradoPonente} ({editableFicha.identificacion.fecha})
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          
          {/* View Switcher */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center space-x-1">
            <button
              onClick={() => setViewMode('text')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'text'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Salida Texto & Negrillas</span>
            </button>
            <button
              onClick={() => setViewMode('interactive')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'interactive'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Vista Interactiva</span>
            </button>
          </div>

          {/* Quick Actions */}
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs px-3 py-2 rounded-lg border border-slate-700 transition-colors"
            title="Copiar texto con negrillas para minutas o alegatos"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copied ? '¡Copiado!' : 'Copiar Texto'}</span>
          </button>

          <button
            onClick={handleSaveToLibrary}
            className="flex items-center space-x-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3 py-2 rounded-lg shadow-sm transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{savedSuccess ? '¡Guardada!' : 'Guardar Ficha'}</span>
          </button>

          <button
            onClick={onOpenRulesModal}
            className="flex items-center space-x-1.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 font-medium text-xs px-3 py-2 rounded-lg transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verificar Reglas</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
            title="Imprimir o Exportar PDF"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
            title="Descargar archivo Markdown (.md)"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>

      {/* VIEW MODE 1: Plain Text with Bold Titles (Strict SALIDA Requirement) */}
      {viewMode === 'text' && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl font-mono text-slate-200 text-sm leading-relaxed whitespace-pre-wrap select-text selection:bg-amber-500/30">
          
          <div className="border-b border-slate-800 pb-4 mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-sans text-amber-400">
              <FileText className="w-4 h-4" />
              <span className="font-semibold uppercase tracking-wider">Formato Estricto de Salida (Títulos y Subtítulos en Negrilla)</span>
            </div>
            <span className="text-[11px] font-sans text-slate-400">
              Listo para copiar e incorporar en memoriales
            </span>
          </div>

          {/* Render Markdown Text formatted with bold headings */}
          <div className="space-y-3">
            {markdownContent.split('\n').map((line, idx) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <div key={idx} className="font-bold text-amber-300 text-base mt-4 mb-1 tracking-tight font-sans">
                    {line.replace(/\*\*/g, '')}
                  </div>
                );
              }
              if (line.includes('**')) {
                // Split line into bold chunks
                const parts = line.split(/(\*\*.*?\*\*)/g);
                return (
                  <div key={idx} className="my-1 text-slate-300 font-sans">
                    {parts.map((part, pIdx) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return (
                          <strong key={pIdx} className="font-bold text-amber-200">
                            {part.replace(/\*\*/g, '')}
                          </strong>
                        );
                      }
                      return <span key={pIdx}>{part}</span>;
                    })}
                  </div>
                );
              }
              return (
                <div key={idx} className="text-slate-300 font-sans">
                  {line}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* VIEW MODE 2: Interactive Card Sections */}
      {viewMode === 'interactive' && (
        <div className="space-y-6">
          
          {/* 1. IDENTIFICACIÓN DE LA PROVIDENCIA */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-amber-400 flex items-center space-x-2 border-b border-slate-800 pb-3 mb-4">
              <Scale className="w-5 h-5 text-amber-400" />
              <span>1. IDENTIFICACIÓN DE LA PROVIDENCIA</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-medium">Corporación:</span>
                <span className="text-slate-100 font-semibold text-sm">{editableFicha.identificacion.corporacion}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-medium">Sala de Decisión:</span>
                <span className="text-slate-100 font-semibold text-sm">{editableFicha.identificacion.sala}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-medium">Tipo y Número de Providencia:</span>
                <span className="text-amber-300 font-bold text-sm">{editableFicha.identificacion.tipoYNumeroProvidencia}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-medium">Número de Radicado / Expediente:</span>
                <span className="text-slate-100 font-semibold text-sm">{editableFicha.identificacion.numeroRadicado}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-medium">Magistrado/a Ponente:</span>
                <span className="text-slate-100 font-semibold text-sm">{editableFicha.identificacion.magistradoPonente}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-medium">Fecha:</span>
                <span className="text-slate-100 font-semibold text-sm">{editableFicha.identificacion.fecha}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-medium">Demandante / Accionante:</span>
                <span className="text-slate-200 font-medium">{editableFicha.identificacion.demandanteAccionante}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-medium">Demandado / Accionado:</span>
                <span className="text-slate-200 font-medium">{editableFicha.identificacion.demandadoAccionado}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 col-span-1 md:col-span-2 lg:col-span-1">
                <span className="text-slate-400 block font-medium">Normas / Objeto Revisado:</span>
                <span className="text-slate-200 font-medium">{editableFicha.identificacion.normasControladasOObjeto}</span>
              </div>
            </div>
          </div>

          {/* 2. HECHOS RELEVANTES */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-amber-400 flex items-center space-x-2 border-b border-slate-800 pb-3 mb-4">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>2. HECHOS RELEVANTES Y ANTECEDENTES</span>
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {editableFicha.hechosRelevantes?.map((h, i) => (
                <li key={i} className="flex items-start space-x-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. PROBLEMA JURÍDICO */}
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-lg font-bold text-amber-400 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>3. PROBLEMA JURÍDICO</span>
              </h3>
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider border ${
                editableFicha.problemaJuridico.origen.includes('expreso')
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                {editableFicha.problemaJuridico.origen}
              </span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-100 font-medium text-base leading-relaxed">
              {editableFicha.problemaJuridico.texto}
            </div>
          </div>

          {/* 4. DECISIÓN (RESUELVE) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-emerald-400 flex items-center space-x-2 border-b border-slate-800 pb-3 mb-4">
              <Check className="w-5 h-5 text-emerald-400" />
              <span>4. DECISIÓN (PARTE RESOLUTIVA)</span>
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
              {editableFicha.decisionResuelve}
            </div>
          </div>

          {/* 5. RATIO DECIDENDI */}
          <div className="bg-slate-900 border-2 border-amber-500/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[10px] font-bold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
              Regla Indispensable del Fallo
            </div>
            <h3 className="text-lg font-bold text-amber-300 flex items-center space-x-2 border-b border-slate-800 pb-3 mb-4">
              <Scale className="w-5 h-5 text-amber-400" />
              <span>5. RATIO DECIDENDI (REGLA JURÍDICA ABSTRACTA)</span>
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30">
                <span className="text-xs font-semibold uppercase text-amber-400 block mb-1">
                  Regla de Precedente Aplicable a Casos Futuros:
                </span>
                <p className="text-slate-100 font-semibold text-base leading-relaxed">
                  {editableFicha.ratioDecidendi.reglaGeneral}
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold uppercase text-slate-400 block mb-1">
                  Fundamentación Técnica y Necesidad para el Resuelve:
                </span>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {editableFicha.ratioDecidendi.fundamentacion}
                </p>
              </div>
            </div>
          </div>

          {/* 6. OBITER DICTA */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-300 flex items-center space-x-2 border-b border-slate-800 pb-3 mb-4">
              <BookOpen className="w-5 h-5 text-slate-400" />
              <span>6. OBITER DICTA (CONSIDERACIONES COMPLEMENTARIAS)</span>
            </h3>
            {editableFicha.obiterDicta?.length > 0 ? (
              <ul className="space-y-2 text-sm text-slate-300">
                {editableFicha.obiterDicta.map((o, i) => (
                  <li key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    {o}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500 italic">NO_INDICADO o no constan argumentos no esenciales en el texto enviado.</p>
            )}
          </div>

          {/* 7. CITAS TEXTUALES Y FUENTES */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-amber-400 flex items-center space-x-2 border-b border-slate-800 pb-3 mb-4">
              <Quote className="w-5 h-5 text-amber-400" />
              <span>7. CITAS TEXTUALES Y JURISPRUDENCIA (MÁXIMO 40 PALABRAS)</span>
            </h3>
            {editableFicha.citasRelevantes?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {editableFicha.citasRelevantes.map((c, i) => (
                  <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <p className="text-slate-200 italic text-sm mb-3">
                      "{c.citaTextual}"
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                      <span>Ubicación: <strong className="text-amber-300">{c.ubicacion}</strong></span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        c.conteoPalabras <= 40 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {c.conteoPalabras} palabras
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No constan citas textuales destacadas.</p>
            )}
          </div>

          {/* 8. SALVAMENTOS Y ACLARACIONES */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-200 flex items-center space-x-2 border-b border-slate-800 pb-3 mb-4">
              <Scale className="w-5 h-5 text-amber-400" />
              <span>8. SALVAMENTOS Y ACLARACIONES DE VOTO</span>
            </h3>
            {editableFicha.salvamentosYAclaraciones?.length > 0 ? (
              <div className="space-y-3">
                {editableFicha.salvamentosYAclaraciones.map((s, i) => (
                  <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-amber-300 text-sm">{s.magistrado}</span>
                      <span className="bg-amber-500/10 text-amber-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-500/20">
                        {s.tipo}
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {s.argumentoCentral}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No constan salvamentos ni aclaraciones de voto expresos en el texto.</p>
            )}
          </div>

          {/* 9. ALERTAS Y OBSERVACIONES */}
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-amber-400 flex items-center space-x-2 border-b border-slate-800 pb-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>9. ALERTAS Y OBSERVACIONES AL PRECEDENTE</span>
            </h3>
            {editableFicha.alertasYObservaciones?.length > 0 ? (
              <ul className="space-y-2 text-sm text-slate-300">
                {editableFicha.alertasYObservaciones.map((a, i) => (
                  <li key={i} className="flex items-start space-x-2 bg-amber-950/20 p-3 rounded-xl border border-amber-500/20">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">Sin alertas o ambigüedades advertidas.</p>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
