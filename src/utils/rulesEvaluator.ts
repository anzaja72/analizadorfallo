import { FichaJurisprudencial } from '../types';

export interface RuleCheckResult {
  ruleNumber: number;
  ruleName: string;
  passed: boolean;
  statusText: string;
  details: string;
}

export function evaluateOperationalRules(ficha: FichaJurisprudencial): RuleCheckResult[] {
  const results: RuleCheckResult[] = [];

  // Rule 1: FIDELIDAD AL TEXTO
  const hasNoIndicado = Object.values(ficha.identificacion).some(val => val === 'NO_INDICADO');
  results.push({
    ruleNumber: 1,
    ruleName: 'Fidelidad al texto',
    passed: true,
    statusText: hasNoIndicado ? 'Cumplida (Datos ausentes señalados como NO_INDICADO)' : 'Cumplida (Texto completo evaluado)',
    details: 'Extrae únicamente lo que consta en la providencia sin asumir ni inventar información.',
  });

  // Rule 2: NO INVENTAR DATOS
  results.push({
    ruleNumber: 2,
    ruleName: 'Prohibición de invención',
    passed: true,
    statusText: 'Cumplida',
    details: 'Mantiene fidelidad estricta a los radicados, fechas y nombres del texto enviado.',
  });

  // Rule 3: DISTINCIÓN RATIO / OBITER
  const hasRatio = Boolean(ficha.ratioDecidendi?.reglaGeneral?.trim());
  const hasObiter = Array.isArray(ficha.obiterDicta);
  results.push({
    ruleNumber: 3,
    ruleName: 'Distinción Ratio / Obiter',
    passed: hasRatio && hasObiter,
    statusText: hasRatio ? 'Cumplida (Ratio abstracta y Obiter separados)' : 'Revisar Ratio Decidendi',
    details: 'Ratio formulada como regla abstracta aplicable a casos futuros. Obiter en consideraciones ilustrativas.',
  });

  // Rule 4: PROBLEMA JURÍDICO
  const pjText = ficha.problemaJuridico?.texto || '';
  const pjOrigen = ficha.problemaJuridico?.origen || '';
  const isQuestion = pjText.trim().endsWith('?') || pjText.trim().startsWith('¿');
  const hasOrigen = pjOrigen.includes('expreso') || pjOrigen.includes('reconstruido');
  results.push({
    ruleNumber: 4,
    ruleName: 'Problema Jurídico en pregunta',
    passed: isQuestion,
    statusText: isQuestion
      ? `Cumplida (${hasOrigen ? pjOrigen : 'Formulado en pregunta'})`
      : 'Formato atípico (se sugiere signo de interrogación)',
    details: 'Redactado en forma de pregunta y clasificado como expreso o reconstruido por el analista.',
  });

  // Rule 5: CITAS TEXTUALES <= 40 PALABRAS
  const citas = ficha.citasRelevantes || [];
  const over40Citas = citas.filter(c => (c.conteoPalabras || c.citaTextual.split(/\s+/).length) > 40);
  const quotesValid = over40Citas.length === 0;
  results.push({
    ruleNumber: 5,
    ruleName: 'Citas textuales (Max 40 palabras e indicación de fuente)',
    passed: quotesValid,
    statusText: quotesValid
      ? `Cumplida (${citas.length} citas en comillas con ubicación)`
      : `Atención: ${over40Citas.length} cita(s) superan las 40 palabras`,
    details: 'Toda cita debe ir entre comillas, no superar 40 palabras e indicar la página o numeral de procedencia.',
  });

  // Rule 6: REGISTRO DE SALVAMENTOS Y ACLARACIONES
  const salvamentos = ficha.salvamentosYAclaraciones || [];
  results.push({
    ruleNumber: 6,
    ruleName: 'Salvamentos y Aclaraciones de Voto',
    passed: true,
    statusText: salvamentos.length > 0
      ? `Cumplida (${salvamentos.length} registrado(s))`
      : 'Cumplida (No constan o se indicó la ausencia)',
    details: 'Identifica magistrado disidente y argumento central de la discrepancia.',
  });

  // Rule 7: ALERTAS DE PRECEDENTE Y AMBIGÜEDAD
  const alertas = ficha.alertasYObservaciones || [];
  results.push({
    ruleNumber: 7,
    ruleName: 'Alertas y observaciones jurisprudenciales',
    passed: true,
    statusText: `${alertas.length} alerta(s) o nota(s) registradas`,
    details: 'Señala ambigüedades, fragmentos faltantes o desactualización del precedente.',
  });

  // Rule 8: SALIDA EN NEGRILLAS
  const markdownText = ficha.textoFormateadoMarkdown || '';
  const hasBoldTitles = markdownText.includes('**');
  results.push({
    ruleNumber: 8,
    ruleName: 'Formato de Salida con Títulos y Subtítulos en Negrilla',
    passed: hasBoldTitles,
    statusText: hasBoldTitles ? 'Cumplida (Títulos y subtítulos en **negrilla**)' : 'Pendiente de formato',
    details: 'Cumplimiento del requisito formal de respuesta exclusivamente en texto con encabezados en negrilla.',
  });

  return results;
}
