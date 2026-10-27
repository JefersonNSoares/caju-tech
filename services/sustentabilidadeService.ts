import { PraticaSustentavel, TipoResiduo, ParametrosResiduo, ResultadoSimulacao } from '../types/sustentabilidade';
import { Feather } from '@expo/vector-icons';

type IconName = keyof typeof Feather.glyphMap;

const PRATICAS_DB: Record<string, PraticaSustentavel> = {
  'residuos': {
    id: 'residuos',
    title: 'Aproveitamento de Resíduos',
    tag: 'Economia Circular',
    description: 'Técnicas para reaproveitamento da casca, folhas e bagaço do caju na compostagem e adubação orgânica.',
    icon: 'refresh-cw' as IconName,
    conteudo: [
      {
        titulo: 'Compostagem do Bagaço',
        texto: 'O bagaço do caju pode ser transformado em adubo orgânico rico em nutrientes.',
        itens: [
          'Triture bem o bagaço do caju restante da prensagem.',
          'Misture com folhas secas e esterco em proporção de 3:1.',
          'Revire a composteira a cada 15 dias.'
        ],
        dicaPratica: 'Mantenha a composteira sempre úmida, mas nunca encharcada.'
      },
      {
        titulo: 'Uso das Folhas',
        texto: 'A palhada da cajucultura serve para proteger o solo contra o ressecamento excessivo.',
        itens: [
          'Aplique como cobertura morta nas raízes.',
          'Auxilia na retenção de umidade durante a seca.'
        ]
      }
    ]
  },
  'bioprodutos': {
    id: 'bioprodutos',
    title: 'Bioprodutos',
    tag: 'Inovação Verde',
    description: 'Produção de bioplásticos, resinas e defensivos naturais a partir do Líquido da Casca do Caju (LCC).',
    icon: 'package' as IconName,
    conteudo: [
      {
        titulo: 'Defensivos Naturais',
        texto: 'O LCC (Líquido da Casca do Caju) possui propriedades inseticidas e fungicidas fortes.',
        itens: [
          'Extraia o LCC com cuidado usando EPIs (luvas e óculos).',
          'Dilua 50ml de LCC para cada 20 Litros de água antes da pulverização.',
          'Aplique nas plantas no final da tarde.'
        ],
        dicaPratica: 'Use sempre equipamentos de proteção. O LCC puro é altamente cáustico e pode queimar a pele.'
      }
    ]
  },
  'boas-praticas': {
    id: 'boas-praticas',
    title: 'Boas Práticas Ambientais',
    tag: 'Manejo Sustentável',
    description: 'Uso eficiente de água, controle biológico de pragas e conservação do solo na cajucultura.',
    icon: 'feather' as IconName,
    conteudo: [
      {
        titulo: 'Manejo Sustentável da Água',
        texto: 'Em regiões semiáridas, o uso racional da água é fundamental para o sucesso e longevidade do pomar.',
        itens: [
          'Instale sistemas de irrigação por gotejamento.',
          'Crie bacias de captação de água da chuva ao lado das árvores.'
        ],
        dicaPratica: 'O gotejamento economiza até 70% de água comparado à irrigação tradicional.'
      }
    ]
  },
  'renda': {
    id: 'renda',
    title: 'Geração de Valor e Renda',
    tag: 'Impacto Social',
    description: 'Modelos de negócios sustentáveis, certificações e estratégias de mercado para agricultura familiar.',
    icon: 'trending-up' as IconName,
    conteudo: [
      {
        titulo: 'Certificações Sustentáveis',
        texto: 'Obter selos de agricultura familiar ou certificações orgânicas aumenta o valor de venda dos derivados.',
        itens: [
          'Procure a assistência técnica (Emater/Senar) do seu estado.',
          'Mantenha cadernos de anotações sobre tudo que é aplicado no pomar.',
          'Participe de cooperativas para baratear os custos do selo.'
        ],
        dicaPratica: 'Produtos com selo orgânico ou de indicação geográfica podem valer de 30% a 50% a mais no mercado.'
      }
    ]
  }
};

const PARAMETROS_RESIDUOS: Record<TipoResiduo, ParametrosResiduo> = {
  casca: {
    id: 'casca',
    nome: 'Casca (LCC)',
    subtitulo: 'Extração do Líquido da Casca da Castanha',
    unidadeEntrada: 'kg de castanha',
    unidadeResiduo: 'L de LCC',
    taxaRendimento: 0.2, // 20% do peso em litros de LCC
    precoUnitario: 4.5, // R$ 4,50 por litro de LCC bruto
    descricaoGanho: 'com a venda do LCC extraído.',
    descricaoResiduo: 'Volume estimado de Líquido da Casca da Castanha (LCC), matéria-prima de alto valor industrial.',
    tutorialRoute: '/sustentabilidade/bioprodutos',
    tutorialNome: 'Como aproveitar este resíduo',
  },
  bagaco: {
    id: 'bagaco',
    nome: 'Bagaço do Caju',
    subtitulo: 'Aproveitamento da polpa/fibra residual',
    unidadeEntrada: 'kg de pedúnculo',
    unidadeResiduo: 'kg de bagaço',
    taxaRendimento: 0.25, // 25% do pedúnculo em bagaço prensado/seco
    precoUnitario: 0.8, // R$ 0,80 por kg de bagaço para ração animal ou compostagem premium
    descricaoGanho: 'com o aproveitamento do bagaço (composto ou ração animal).',
    descricaoResiduo: 'Massa fibrosa residual ideal para enriquecimento do solo ou suplementação alimentar de rebanhos.',
    tutorialRoute: '/sustentabilidade/residuos',
    tutorialNome: 'Como aproveitar este resíduo',
  },
};

export const sustentabilidadeService = {
  getPraticaById(id: string): PraticaSustentavel | null {
    return PRATICAS_DB[id] || null;
  },
  getAllPraticas(): PraticaSustentavel[] {
    return Object.values(PRATICAS_DB);
  },
  getParametrosResiduo(tipo: TipoResiduo): ParametrosResiduo {
    return PARAMETROS_RESIDUOS[tipo];
  },
  calcularSimulacaoResiduo(tipo: TipoResiduo, quantidadeKg: number): ResultadoSimulacao {
    const params = PARAMETROS_RESIDUOS[tipo];
    // Validação estrita: apenas positivos, máximo 100 toneladas (100.000 kg)
    const sanitizedKg = Math.min(Math.max(0, isNaN(quantidadeKg) ? 0 : Math.floor(quantidadeKg)), 100000);
    
    const quantidadeResiduo = Math.round(sanitizedKg * params.taxaRendimento * 10) / 10;
    const valorEstimado = Math.round(quantidadeResiduo * params.precoUnitario * 100) / 100;

    return {
      tipo,
      quantidadeEntradaKg: sanitizedKg,
      quantidadeResiduo,
      unidadeResiduo: params.unidadeResiduo,
      valorEstimado,
      descricaoGanho: params.descricaoGanho,
      rendimentoPercentual: Math.round(params.taxaRendimento * 100),
      cotacaoReferencia: `R$ ${params.precoUnitario.toFixed(2).replace('.', ',')} / ${params.unidadeResiduo.split(' ')[0]}`,
    };
  },
};

