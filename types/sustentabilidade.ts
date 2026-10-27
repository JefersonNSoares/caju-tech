export interface SecaoConteudo {
  titulo: string;
  texto: string;
  itens?: string[];
  dicaPratica?: string;
}

export interface PraticaSustentavel {
  id: string;
  title: string;
  tag: string;
  description: string;
  icon: any; // using any for feather icon names temporarily or string if preferred
  conteudo: SecaoConteudo[];
}

export type TipoResiduo = 'casca' | 'bagaco';

export interface ParametrosResiduo {
  id: TipoResiduo;
  nome: string;
  subtitulo: string;
  unidadeEntrada: string;
  unidadeResiduo: string;
  taxaRendimento: number; // Porcentagem convertida (ex: 0.20 para 20% LCC, 0.25 para 25% bagaço)
  precoUnitario: number; // Valor em R$ por unidade de resíduo gerado (ex: R$ 4,50/L LCC, R$ 0,80/kg bagaço)
  descricaoGanho: string;
  descricaoResiduo: string;
  tutorialRoute: string;
  tutorialNome: string;
}

export interface ResultadoSimulacao {
  tipo: TipoResiduo;
  quantidadeEntradaKg: number;
  quantidadeResiduo: number;
  unidadeResiduo: string;
  valorEstimado: number;
  descricaoGanho: string;
  rendimentoPercentual: number;
  cotacaoReferencia: string;
}

