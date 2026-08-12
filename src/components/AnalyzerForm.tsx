import React, { useState } from 'react';
import { PROVIDENCIAS_EJEMPLO } from '../data/ejemplos';
import { Scale, Sparkles, BookOpen, Upload, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

interface AnalyzerFormProps {
  onAnalyze: (providenciaText: string, corporacionTarget: string) => Promise<void>;
  isLoading: boolean;
}

export const AnalyzerForm: React.FC<AnalyzerFormProps> = ({ onAnalyze, isLoading }) => {
  const [providenciaText, setProvidenciaText] = useState<string>('');
  const [corporacionTarget, setCorporacionTarget] = useState<string>('Corte Constitucional / Altas Cortes');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSelectSample = (sampleId: string) => {
    const found = PROVIDENCIAS_EJEMPLO.find((p) => p.id === sampleId);
    if (found) {
      setProvidenciaText(found.textoCompleto);
      if (found.corporacion.includes('Corte Constitucional')) {
        setCorporacionTarget('Corte Constitucional');
      } else if (found.corporacion.includes('Corte Suprema')) {
        setCorporacionTarget('Corte Suprema de Justicia');
      } else if (found.corporacion.includes('Consejo de Estado')) {
        setCorporacionTarget('Consejo de Estado');
      }
      setErrorMessage(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('El archivo excede el tamaño máximo permitido (10MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setProvidenciaText(text);
        setErrorMessage(null);
      }
    };
    reader.onerror = () => {
      setErrorMessage('Error al leer el archivo. Intenta copiando y pegando el texto directamente.');
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!providenciaText.trim()) {
      setErrorMessage('Por favor ingrese o pegue el texto de la providencia judicial a analizar.');
      return;
    }
    setErrorMessage(null);
    onAnalyze(providenciaText, corporacionTarget);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl text-slate-100">
      
      {/* Title & Instructions */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Extractor Jurisprudencial Automatizado</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Cargar Providencia Judicial para Ficha Técnica
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Analiza el texto de cualquier providencia de la Corte Constitucional, Corte Suprema de Justicia, Consejo de Estado o Tribunales. Extrae Ratio Decidendi, Obiter Dicta, Problema Jurídico, Citas cortas y Salvamentos respetando las 7 Reglas Operativas.
        </p>
      </div>

      {/* Pre-loaded Sample Buttons */}
      <div className="mb-6 bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300 mb-3">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Cargar Sentencia Hito de Ejemplo (Providencias Emblemáticas)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PROVIDENCIAS_EJEMPLO.map((ej) => (
            <button
              key={ej.id}
              type="button"
              onClick={() => handleSelectSample(ej.id)}
              disabled={isLoading}
              className="text-left bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 rounded-lg p-3 transition-all group disabled:opacity-50"
            >
              <div className="font-semibold text-xs text-amber-300 group-hover:text-amber-200 truncate">
                {ej.titulo}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {ej.resumenBreve}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Form Inputs */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Target Corporation */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Corporación / Enfoque de Precedente
            </label>
            <select
              value={corporacionTarget}
              onChange={(e) => setCorporacionTarget(e.target.value)}
              disabled={isLoading}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              <option value="Corte Constitucional">Corte Constitucional (Tutelas / C- / SU-)</option>
              <option value="Corte Suprema de Justicia">Corte Suprema de Justicia (Casación Penal / Civil / Laboral)</option>
              <option value="Consejo de Estado">Consejo de Estado (Secciones I - V / Nulidades / Responsabilidad)</option>
              <option value="Tribunal Superior de Distrito">Tribunal Superior de Distrito Judicial / Juzgados</option>
            </select>
          </div>

          {/* Quick Upload Text File */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              O Cargar desde Archivo (.txt / .plain)
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".txt,.text,.md"
                onChange={handleFileUpload}
                disabled={isLoading}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center space-x-2 w-full bg-slate-950 hover:bg-slate-800/80 border border-slate-700 border-dashed rounded-lg px-3 py-2.5 text-xs text-slate-300 cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Seleccionar archivo de texto</span>
              </label>
            </div>
          </div>

        </div>

        {/* Text Area */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Texto Íntegro o Parcial de la Providencia Judicial *
            </label>
            {providenciaText.trim() && (
              <span className="text-[11px] text-slate-400">
                {providenciaText.trim().split(/\s+/).length} palabras | {providenciaText.length} caracteres
              </span>
            )}
          </div>
          <textarea
            value={providenciaText}
            onChange={(e) => setProvidenciaText(e.target.value)}
            disabled={isLoading}
            rows={10}
            placeholder="Pegue aquí el texto completo o las consideraciones de la sentencia o providencia judicial..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-500 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/50 leading-relaxed resize-y"
          ></textarea>
        </div>

        {/* Operational Rules Info Note */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-400 flex items-start space-x-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-200">Garantía de Fidelidad y Reglas de Precedente:</span>
            <span className="ml-1">
              Si un dato no consta en la providencia se marcará como <code className="bg-slate-800 text-amber-300 px-1 py-0.5 rounded text-[11px]">NO_INDICADO</code>. El problema jurídico se formulará en pregunta. La Ratio Decidendi se redactará como regla abstracta. Las citas no superarán 40 palabras.
            </span>
          </div>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="bg-red-950/60 border border-red-500/50 rounded-xl p-3.5 text-xs text-red-300 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || !providenciaText.trim()}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Analizando Providencia y Generando Ficha...</span>
              </>
            ) : (
              <>
                <Scale className="w-5 h-5" />
                <span>Generar Ficha Jurisprudencial Estructurada</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
