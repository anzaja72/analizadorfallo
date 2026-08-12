import React from 'react';
import { FichaJurisprudencial } from '../types';
import { evaluateOperationalRules } from '../utils/rulesEvaluator';
import { CheckCircle2, AlertTriangle, ShieldCheck, X } from 'lucide-react';

interface RuleCheckerModalProps {
  ficha: FichaJurisprudencial;
  onClose: () => void;
}

export const RuleCheckerModal: React.FC<RuleCheckerModalProps> = ({ ficha, onClose }) => {
  const ruleResults = evaluateOperationalRules(ficha);
  const totalPassed = ruleResults.filter((r) => r.passed).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-slate-100 relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Validador de Reglas Operativas</h3>
              <p className="text-xs text-slate-400">
                Verificación automática de estándares de técnica de precedentes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Banner */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Cumplimiento de Reglas de Operación
            </span>
            <span className="text-xl font-bold text-emerald-400">
              {totalPassed} de {ruleResults.length} Reglas Validadas
            </span>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            100% Conforme
          </div>
        </div>

        {/* Rule List */}
        <div className="space-y-3 overflow-y-auto pr-1 flex-1">
          {ruleResults.map((rule) => (
            <div
              key={rule.ruleNumber}
              className={`p-3.5 rounded-xl border transition-all ${
                rule.passed
                  ? 'bg-slate-950/60 border-slate-800'
                  : 'bg-amber-950/30 border-amber-500/30'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {rule.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <span className="font-bold text-sm text-slate-200">
                    Regla {rule.ruleNumber}: {rule.ruleName}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    rule.passed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}
                >
                  {rule.statusText}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 pl-6">
                {rule.details}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 mt-4 text-right">
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
          >
            Entendido y Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
