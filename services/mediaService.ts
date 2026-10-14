import { MediaResource, MediaType } from '../types/media';

const LOCAL_MEDIA_ITEMS: MediaResource[] = [
  // VÍDEOS EDUCATIVOS
  {
    id: 'vid1',
    type: 'video',
    category: 'enxertia',
    categoryLabel: 'Enxertia e Propagação',
    title: 'Como fazer um enxerto de cajueiro por borbulha! Veja o passo a passo',
    summary: 'Aprenda o passo a passo detalhado para realizar enxertia por borbulha no cajueiro, técnica eficaz para multiplicação clonal rápida e uniforme.',
    tag: 'Enxertia por Borbulha',
    duration: '07:15 min',
    youtubeId: 'ATr1cGaLVNY',
    bannerColor: '#2E7D32',
    iconName: 'video',
  },
  {
    id: 'vid2',
    type: 'video',
    category: 'manejo',
    categoryLabel: 'Manejo e Poda',
    title: 'Poda de limpeza na cultura do caju - Gilmar Pereira de Farias (BA)',
    summary: 'Orientações práticas de campo sobre poda de limpeza pós-safra na cajucultura com o produtor Gilmar Pereira de Farias na Bahia.',
    tag: 'Poda de Limpeza',
    duration: '06:30 min',
    youtubeId: 'ksQSnMYUYAA',
    bannerColor: '#1B5E20',
    iconName: 'video',
  },
  {
    id: 'vid3',
    type: 'video',
    category: 'derivados',
    categoryLabel: 'Cajuína e Derivados',
    title: 'Como fazer cajuína artesanalmente, método caseiro simples e prático',
    summary: 'Método caseiro simples e prático de fabricação da cajuína clarificada com gelatina, garantindo produto límpido, saboroso e com cor âmbar tradicional.',
    tag: 'Cajuína Artesanal',
    duration: '08:45 min',
    youtubeId: 'fKaccvevJXY',
    bannerColor: '#E65100',
    iconName: 'video',
  },
  {
    id: 'vid4',
    type: 'video',
    category: 'colheita',
    categoryLabel: 'Irrigação e Recursos Hídricos',
    title: 'Sistema Irrigação de gotejamento pra plantar cajú',
    summary: 'Apresentação prática da montagem e funcionamento da irrigação por gotejamento localizada para plantio e condução de cajueiros no semiárido.',
    tag: 'Irrigação Localizada',
    duration: '05:50 min',
    youtubeId: 'dAO3bhovIuk',
    bannerColor: '#00695C',
    iconName: 'video',
  },

  // INFOGRÁFICOS PRÁTICOS
  {
    id: 'info1',
    type: 'infografico',
    category: 'manejo',
    categoryLabel: 'Calendário Agronômico',
    title: 'Calendário Anual da Cajucultura no Semiárido',
    summary: 'Esquema visual detalhando os meses de poda (janeiro-março), adubação e início de brotação (abril-junho), floração (julho-agosto) e safra de colheita (setembro-dezembro).',
    tag: 'Guia Visual Rápido',
    bannerColor: '#33691E',
    iconName: 'calendar',
    infographicSteps: [
      {
        stepNumber: 1,
        title: 'Janeiro a Março: Pós-Safra e Podas',
        description: 'Eliminação de ramos secos, controle de brocas remanescentes e coroamento das plantas antes das chuvas.',
        criticalNotice: 'Desinfetar todas as tesouras e serrotes com álcool ou água sanitária.',
      },
      {
        stepNumber: 2,
        title: 'Abril a Junho: Adubação e Vegetação',
        description: 'Aplicação de adubação orgânica e fosfatada na projeção da copa, aproveitando a umidade residual do solo.',
      },
      {
        stepNumber: 3,
        title: 'Julho a Agosto: Floração e Polinização',
        description: 'Abertura das panículas florais. Monitoramento rigoroso do oídio e proteção contra defensivos tóxicos a abelhas polinizadoras.',
        criticalNotice: 'Nunca aplicar inseticidas nos horários de maior visitação das abelhas nativas (8h às 14h).',
      },
      {
        stepNumber: 4,
        title: 'Setembro a Dezembro: Safra e Colheita',
        description: 'Colheita diária do caju para consumo fresco e envio ágil para cajuína e processamento da castanha.',
      },
    ],
    infographicKeyHighlights: [
      'Floração coincide com os dias mais secos e ensolarados do Piauí.',
      'A umidade noturna exige atenção para pulverizações preventivas de enxofre.',
      'Colheita diária evita a perda por fermentação no chão quente.',
    ],
  },
  {
    id: 'info2',
    type: 'infografico',
    category: 'enxertia',
    categoryLabel: 'Propagação Vegetativa',
    title: 'Passo a Passo da Garfagem em Fenda Cheia',
    summary: 'Fluxograma ilustrado da união entre o porta-enxerto jovem (cavalo) e a ponteira clonal (garfo) de clone precoce produtivo.',
    tag: 'Técnica Agronômica',
    bannerColor: '#2E7D32',
    iconName: 'git-merge',
    infographicSteps: [
      {
        stepNumber: 1,
        title: 'Preparo do Porta-Enxerto (Cavalo)',
        description: 'Muda de 40 a 60 dias com caule liso de 4 a 6 mm de diâmetro. Decapitar a haste a 15-20 cm de altura com corte horizontal limpo.',
      },
      {
        stepNumber: 2,
        title: 'Abertura da Fenda Longitudinal',
        description: 'Com lâmina esterilizada, abrir fenda vertical de 2 a 3 cm de profundidade no centro do caule decapitado.',
        criticalNotice: 'Não descer a fenda com movimentos de vaivém para não esmagar os vasos condutores.',
      },
      {
        stepNumber: 3,
        title: 'Bisel Duplo no Garfo',
        description: 'Cortar a base da ponteira clonal em formato de cunha chanfrada de 2 a 3 cm, mantendo gemas dormentes no topo.',
      },
      {
        stepNumber: 4,
        title: 'Acoplamento e Amarração Firme',
        description: 'Inserir a cunha na fenda alinhando o câmbio vascular de pelo menos um dos lados. Enrolar fita plástica transparente de baixo para cima.',
        criticalNotice: 'Cobrir com saquinho plástico transparente nos primeiros 15 dias para criar câmara úmida.',
      },
    ],
    infographicKeyHighlights: [
      'Pegamento ocorre entre 15 e 21 dias se protegido do sol direto.',
      'Retirar brotações do porta-enxerto que surgirem abaixo do enxerto.',
      'Aclimatar gradualmente à luz solar antes de levar ao campo.',
    ],
  },
  {
    id: 'info3',
    type: 'infografico',
    category: 'derivados',
    categoryLabel: 'Processamento Agroindustrial',
    title: 'Fluxograma de Extração da Carne de Caju (Fibra)',
    summary: 'Aproveitamento do bagaço de caju para formulação de carne vegetal sustentável sem aditivos artificiais.',
    tag: 'Economia Circular',
    bannerColor: '#D84315',
    iconName: 'refresh-cw',
    infographicSteps: [
      {
        stepNumber: 1,
        title: 'Despolpamento e Prensagem',
        description: 'Após extração do suco em prensa manual ou helicoidal, separar o bagaço fibroso úmido.',
      },
      {
        stepNumber: 2,
        title: 'Lavagem em Água Corrente e Desodorização',
        description: 'Lavar o bagaço em água tratada 2 a 3 vezes para remover resíduos ácidos e excesso de açúcares livres.',
      },
      {
        stepNumber: 3,
        title: 'Branqueamento Térmico Rápido',
        description: 'Mergulhar em água fervente com gotas de suco de limão ou vinagre por 3 minutos para inativar enzimas de escurecimento.',
        criticalNotice: 'Resfriar imediatamente em água fria para interromper o cozimento excessivo.',
      },
      {
        stepNumber: 4,
        title: 'Prensagem Final e Condicionamento',
        description: 'Prensar para retirar 80% da água. A fibra pronta pode ser desfiada, temperada com cheiro-verde, alho e azeite ou congelada.',
      },
    ],
    infographicKeyHighlights: [
      'Reduz a zero o descarte do pedúnculo após a produção de cajuína.',
      'Excelente fonte de fibras alimentares solúveis e insolúveis.',
      'Base para recheios de pastel, coxinhas vegetais e hambúrgueres do cerrado.',
    ],
  },
];

export const mediaService = {
  async getMediaItems(
    typeFilter: 'todos' | MediaType = 'todos',
    categoryFilter: string = 'todos',
    searchQuery: string = ''
  ): Promise<MediaResource[]> {
    // Carregamento local suave (< 250ms)
    await new Promise((resolve) => setTimeout(resolve, 200));

    let items = [...LOCAL_MEDIA_ITEMS];

    if (typeFilter !== 'todos') {
      items = items.filter((item) => item.type === typeFilter);
    }

    if (categoryFilter !== 'todos') {
      items = items.filter((item) => item.category === categoryFilter);
    }

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.tag.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q)
      );
    }

    return items;
  },

  async getMediaById(id: string): Promise<MediaResource | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const found = LOCAL_MEDIA_ITEMS.find((m) => m.id === id);
    return found || null;
  },
};
