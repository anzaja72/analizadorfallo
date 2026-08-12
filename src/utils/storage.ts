import { FichaJurisprudencial } from '../types';

const STORAGE_KEY = 'fichas_jurisprudenciales_colombia_v1';

export function getSavedFichas(): FichaJurisprudencial[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error leyendo fichas guardadas:', e);
    return [];
  }
}

export function saveFicha(ficha: FichaJurisprudencial): void {
  try {
    const existing = getSavedFichas();
    const index = existing.findIndex(f => f.id === ficha.id);
    if (index >= 0) {
      existing[index] = ficha;
    } else {
      existing.unshift(ficha);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Error guardando ficha:', e);
  }
}

export function deleteFicha(id: string): void {
  try {
    const existing = getSavedFichas();
    const filtered = existing.filter(f => f.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Error eliminando ficha:', e);
  }
}

export function generateMarkdownText(ficha: FichaJurisprudencial): string {
  return `**FICHA JURISPRUDENCIAL ESTRUCTURADA**
**Corte Constitucional / Altas Cortes de Colombia**

**1. IDENTIFICACIÓN DE LA PROVIDENCIA**
**1.1. Corporación:** ${ficha.identificacion.corporacion || 'NO_INDICADO'}
**1.2. Sala de Decisión:** ${ficha.identificacion.sala || 'NO_INDICADO'}
**1.3. Tipo y Número de Providencia:** ${ficha.identificacion.tipoYNumeroProvidencia || 'NO_INDICADO'}
**1.4. Número de Radicado / Expediente:** ${ficha.identificacion.numeroRadicado || 'NO_INDICADO'}
**1.5. Magistrado/a Ponente:** ${ficha.identificacion.magistradoPonente || 'NO_INDICADO'}
**1.6. Fecha:** ${ficha.identificacion.fecha || 'NO_INDICADO'}
**1.7. Demandante / Accionante:** ${ficha.identificacion.demandanteAccionante || 'NO_INDICADO'}
**1.8. Demandado / Accionado:** ${ficha.identificacion.demandadoAccionado || 'NO_INDICADO'}
**1.9. Normas / Actos Examinados:** ${ficha.identificacion.normasControladasOObjeto || 'NO_INDICADO'}

**2. HECHOS RELEVANTES Y ANTECEDENTES**
${ficha.hechosRelevantes?.length > 0 ? ficha.hechosRelevantes.map((h, i) => `**2.${i + 1}.** ${h}`).join('\n') : 'NO_INDICADO'}

**3. PROBLEMA JURÍDICO**
**3.1. Formulación del Problema:** ${ficha.problemaJuridico?.texto || 'NO_INDICADO'}
**3.2. Origen de la Formulación:** ${ficha.problemaJuridico?.origen || 'NO_INDICADO'}

**4. DECISIÓN (PARTE RESOLUTIVA)**
**4.1. Resuelve:**
${ficha.decisionResuelve || 'NO_INDICADO'}

**5. RATIO DECIDENDI (REGLA DE PRECEDENTE)**
**5.1. Regla Jurídica Abstracta:** ${ficha.ratioDecidendi?.reglaGeneral || 'NO_INDICADO'}
**5.2. Fundamentación Técnica:** ${ficha.ratioDecidendi?.fundamentacion || 'NO_INDICADO'}

**6. OBITER DICTA (CONSIDERACIONES COMPLEMENTARIAS)**
${ficha.obiterDicta?.length > 0 ? ficha.obiterDicta.map((o, i) => `**6.${i + 1}.** ${o}`).join('\n') : 'NO_INDICADO'}

**7. CITAS TEXTUALES Y FUENTES Y JURISPRUDENCIA**
${ficha.citasRelevantes?.length > 0 ? ficha.citasRelevantes.map((c, i) => `**7.${i + 1}.** "${c.citaTextual}" (Ubicación: ${c.ubicacion} - ${c.conteoPalabras} palabras)`).join('\n') : 'NO_INDICADO'}

**8. SALVAMENTOS Y ACLARACIONES DE VOTO**
${ficha.salvamentosYAclaraciones?.length > 0 ? ficha.salvamentosYAclaraciones.map((s, i) => `**8.${i + 1}. Magistrado/a:** ${s.magistrado}\n**8.${i + 1}.1. Tipo:** ${s.tipo}\n**8.${i + 1}.2. Argumento Central:** ${s.argumentoCentral}`).join('\n\n') : 'No constan salvamentos de voto en el texto analizado.'}

**9. ALERTAS Y OBSERVACIONES DEL PRECEDENTE**
${ficha.alertasYObservaciones?.length > 0 ? ficha.alertasYObservaciones.map((a, i) => `**9.${i + 1}.** ${a}`).join('\n') : 'Sin alertas particulares.'}

**10. LÍNEA JURISPRUDENCIAL Y UBICACIÓN DEL PRECEDENTE**
**10.1. Posición Jurisprudencial:** ${ficha.lineaJurisprudencialSugerida || 'NO_INDICADO'}`;
}
