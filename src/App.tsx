import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AnalyzerForm } from './components/AnalyzerForm';
import { FichaView } from './components/FichaView';
import { FichasHistory } from './components/FichasHistory';
import { PrecedentComparator } from './components/PrecedentComparator';
import { RulesExplanationView } from './components/RulesExplanationView';
import { RuleCheckerModal } from './components/RuleCheckerModal';
import { FichaJurisprudencial } from './types';
import { getSavedFichas, saveFicha, deleteFicha } from './utils/storage';
import { AlertCircle, Scale, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'nuevo' | 'historial' | 'comparador' | 'reglas'>('nuevo');
  const [currentFicha, setCurrentFicha] = useState<FichaJurisprudencial | null>(null);
  const [savedFichas, setSavedFichas] = useState<FichaJurisprudencial[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);

  useEffect(() => {
    const loaded = getSavedFichas();
    setSavedFichas(loaded);
  }, []);

  const handleAnalyze = async (providenciaText: string, corporacionTarget: string) => {
    setIsLoading(true);
    setError(null);

    try {
      let response;
      try {
        response = await fetch('/api/analyze-providencia', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            providenciaText,
            options: { corporacionTarget },
          }),
        });
      } catch (networkErr: any) {
        throw new Error('No se pudo establecer conexión con el servidor backend. Por favor reintenta en unos segundos.');
      }

      let json;
      try {
        json = await response.json();
      } catch (e) {
        throw new Error(`Respuesta inválida del servidor (${response.status} ${response.statusText}).`);
      }

      if (!response.ok || !json.success) {
        throw new Error(json.error || json.details || 'Error al procesar la providencia judicial.');
      }

      const extracted = json.data;
      const newFicha: FichaJurisprudencial = {
        id: `ficha_${Date.now()}`,
        fechaCreacion: new Date().toISOString(),
        nombreTitulo: extracted.identificacion?.tipoYNumeroProvidencia || 'Ficha Jurisprudencial',
        providenciaOriginalText: providenciaText,
        ...extracted,
      };

      setCurrentFicha(newFicha);
      saveFicha(newFicha);
      setSavedFichas(getSavedFichas());
    } catch (err: any) {
      console.error('Error analizando providencia:', err);
      setError(err.message || 'Ocurrió un error inesperado en la comunicación con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveFicha = (fichaToSave: FichaJurisprudencial) => {
    saveFicha(fichaToSave);
    setSavedFichas(getSavedFichas());
  };

  const handleDeleteFicha = (id: string) => {
    deleteFicha(id);
    setSavedFichas(getSavedFichas());
    if (currentFicha?.id === id) {
      setCurrentFicha(null);
    }
  };

  const handleSelectFromHistory = (selected: FichaJurisprudencial) => {
    setCurrentFicha(selected);
    setActiveTab('nuevo');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30">
      
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        fichasCount={savedFichas.length}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* TAB 1: NUEVO ANÁLISIS */}
        {activeTab === 'nuevo' && (
          <div className="space-y-8">
            <AnalyzerForm onAnalyze={handleAnalyze} isLoading={isLoading} />

            {error && (
              <div className="bg-red-950/80 border border-red-500/50 rounded-2xl p-4 text-xs text-red-200 flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <div>
                  <strong className="block text-red-300 font-semibold">Error de Análisis:</strong>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {currentFicha && (
              <FichaView
                ficha={currentFicha}
                onSave={handleSaveFicha}
                onOpenRulesModal={() => setShowRulesModal(true)}
                isSaved={savedFichas.some((f) => f.id === currentFicha.id)}
              />
            )}
          </div>
        )}

        {/* TAB 2: HISTORIAL / BIBLIOTECA */}
        {activeTab === 'historial' && (
          <FichasHistory
            fichas={savedFichas}
            onSelectFicha={handleSelectFromHistory}
            onDeleteFicha={handleDeleteFicha}
            onNewFicha={() => setActiveTab('nuevo')}
          />
        )}

        {/* TAB 3: COMPARADOR DE PRECEDENTES */}
        {activeTab === 'comparador' && (
          <PrecedentComparator fichas={savedFichas} />
        )}

        {/* TAB 4: REGLAS OPERATIVAS */}
        {activeTab === 'reglas' && (
          <RulesExplanationView />
        )}

      </main>

      {/* Modal Validador de Reglas */}
      {showRulesModal && currentFicha && (
        <RuleCheckerModal
          ficha={currentFicha}
          onClose={() => setShowRulesModal(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-amber-500" />
            <span>Analista Jurisprudencial de Derecho Colombiano • Precedente Altas Cortes</span>
          </div>
          <span>Fidelidad Textual • Ratio Decidendi • Obiter Dicta • Salvamentos</span>
        </div>
      </footer>

    </div>
  );
}
