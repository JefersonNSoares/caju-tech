export type DerivadoCategoria = 'castanha' | 'cajuina' | 'doces' | 'fibra';

export interface PassoProcessamento {
  ordem: number;
  titulo: string;
  descricao: string;
  dica?: string;
}

export interface RendimentoInfo {
  materiaPrima: string;
  produtoFinal: string;
  taxaAproveitamento: string;
  subprodutosSecundarios: string[];
}

export interface DerivadoDetail {
  id: DerivadoCategoria;
  title: string;
  tag: string;
  icon: 'disc' | 'coffee' | 'sun' | 'layers';
  materiaPrimaPrincipal: 'Pedúnculo (Falso Fruto)' | 'Castanha (Fruto Verdadeiro)' | 'Pedúnculo e Bagaço';
  tempoMedio: string;
  dificuldade: 'Fácil' | 'Média' | 'Avançada';
  descricao: string;
  equipamentos: string[];
  insumos: string[];
  rendimento: RendimentoInfo;
  passos: PassoProcessamento[];
  boasPraticas: string[];
  avisosSeguranca?: string[];
}
