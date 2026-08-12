import React from 'react';
import { ShieldCheck, Scale, CheckCircle2, FileText, AlertTriangle, BookOpen, Quote } from 'lucide-react';

export const RulesExplanationView: React.FC = () => {
  const rules = [
    {
      num: 1,
      title: 'FIDELIDAD AL TEXTO',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      desc: 'Extrae únicamente lo que aparece en la providencia. Está prohibido completar datos con conocimiento previo. Si un campo no consta en el documento, escribe exactamente "NO_INDICADO".',
    },
    {
      num: 2,
      title: 'PROHIBICIÓN DE INVENCIÓN',
      icon: <Scale className="w-5 h-5 text-amber-400" />,
      desc: 'No generes números de radicado, fechas, nombres de magistrados ni sentencias citadas que no figuren literalmente en el texto enviado.',
    },
    {
      num: 3,
      title: 'DISTINCIÓN RATIO / OBITER',
      icon: <BookOpen className="w-5 h-5 text-amber-400" />,
      desc: 'ratio_decidendi = la regla jurídica indispensable para la decisión. Sin ella, el resuelve cambiaría. Redáctala como regla abstracta aplicable a casos futuros. obiter_dicta = consideraciones ilustrativas o complementarias.',
    },
    {
      num: 4,
      title: 'PROBLEMA JURÍDICO EN PREGUNTA',
      icon: <FileText className="w-5 h-5 text-amber-400" />,
      desc: 'Formúlalo en forma de pregunta. Si la providencia lo enuncia expresamente, transcríbelo resumido; si no, dedúcelo y márcalo como "reconstruido por el analista".',
    },
    {
      num: 5,
      title: 'CITAS TEXTUALES Y MÁXIMO 40 PALABRAS',
      icon: <Quote className="w-5 h-5 text-emerald-400" />,
      desc: 'Toda cita textual debe ir entre comillas, no exceder 40 palabras e indicar la página, folio o numeral de donde proviene en el texto.',
    },
    {
      num: 6,
      title: 'REGISTRO DE SALVAMENTOS Y ACLARACIONES DE VOTO',
      icon: <Scale className="w-5 h-5 text-amber-400" />,
      desc: 'Registra siempre los salvamentos y aclaraciones de voto, indicando el magistrado/a y el argumento central de la disidencia.',
    },
    {
      num: 7,
      title: 'ALERTAS DE PRECEDENTE Y TEXTO',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
      desc: 'Usa el campo "alertas" para señalar ambigüedades, texto ilegible, providencias incompletas o posible desactualización del precedente.',
    },
    {
      num: 8,
      title: 'FORMATO DE SALIDA DE TEXTO',
      icon: <FileText className="w-5 h-5 text-emerald-400" />,
      desc: 'Responde ÚNICAMENTE en texto con títulos y subtítulos en negrilla (usando **1. IDENTIFICACIÓN DE LA PROVIDENCIA**, etc.).',
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl text-slate-100 space-y-6">
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">
            Reglas Operativas de Análisis de Precedente
          </h2>
          <p className="text-xs text-slate-400">
            Técnica analítica de la Corte Constitucional y Altas Cortes de Colombia
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map((r) => (
          <div key={r.num} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2">
              {r.icon}
              <span className="font-bold text-sm text-slate-200">
                {r.num}. {r.title}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pl-7">
              {r.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
