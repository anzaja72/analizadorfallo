export interface IdentificacionProvidencia {
  corporacion: string;
  sala: string;
  tipoYNumeroProvidencia: string;
  numeroRadicado: string;
  magistradoPonente: string;
  fecha: string;
  demandanteAccionante: string;
  demandadoAccionado: string;
  normasControladasOObjeto: string;
}

export interface ProblemaJuridico {
  texto: string;
  origen: 'expreso en la providencia' | 'reconstruido por el analista' | string;
}

export interface RatioDecidendi {
  reglaGeneral: string;
  fundamentacion: string;
}

export interface CitaRelevante {
  citaTextual: string;
  ubicacion: string;
  conteoPalabras: number;
}

export interface SalvamentoAclaracion {
  magistrado: string;
  tipo: 'Salvamento de voto' | 'Aclaración de voto' | 'Salvamento parcial' | string;
  argumentoCentral: string;
}

export interface FichaJurisprudencial {
  id: string;
  fechaCreacion: string;
  nombreTitulo: string;
  providenciaOriginalText: string;
  identificacion: IdentificacionProvidencia;
  hechosRelevantes: string[];
  problemaJuridico: ProblemaJuridico;
  decisionResuelve: string;
  ratioDecidendi: RatioDecidendi;
  obiterDicta: string[];
  citasRelevantes: CitaRelevante[];
  salvamentosYAclaraciones: SalvamentoAclaracion[];
  alertasYObservaciones: string[];
  lineaJurisprudencialSugerida: string;
  textoFormateadoMarkdown: string;
  etiquetas?: string[];
}

export interface ProvidenciaEjemplo {
  id: string;
  titulo: string;
  corporacion: string;
  resumenBreve: string;
  textoCompleto: string;
}
