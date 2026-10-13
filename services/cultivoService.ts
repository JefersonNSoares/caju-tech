import { CultivoStage, CultivoStageId } from '../types/cultivo';

const CULTIVO_STAGES_DATA: Record<CultivoStageId, CultivoStage> = {
  plantio: {
    id: 'plantio',
    route: '/(tabs)/cultivo/plantio',
    title: 'Plantio e Espaçamento',
    subtitle: 'Preparo do solo, coveamento e espaçamento recomendado para cajueiro-anão precoce.',
    icon: 'target',
    badge: 'Implantação',
    intro:
      'O sucesso da cultura do cajueiro-anão precoce inicia com a seleção adequada da área e o preparo do solo. Recomenda-se solos profundos, de textura média a arenosa, bem drenados. A época ideal para o plantio no semiárido é no início da estação chuvosa, assegurando o pegamento e o enraizamento vigoroso das mudas enxertadas.',
    orientacoes: [
      'Espaçamento recomendado: 7m x 7m (204 plantas/ha) ou 8m x 6m (208 plantas/ha) para viabilizar tratos culturais mecanizados.',
      'Dimensão das covas: 40 x 40 x 40 cm em solos soltos, ou 50 x 50 x 50 cm em solos mais compactados.',
      'Adubação de fundação: aplicar de 10 a 20 litros de esterco de curral bem curtido + 200g de superfosfato simples por cova pelo menos 30 dias antes do plantio.',
      'Posicionamento da muda: manter o ponto de enxertia cerca de 5 cm acima do nível do solo para evitar podridões e emissão de brotos do porta-enxerto.',
      'Tutoramento e coroamento: tutorar a muda jovem com estaca de madeira para protegê-la contra ventos fortes característicos do Nordeste.',
    ],
    videos: [
      {
        id: 'plantio-v1',
        videoId: 'KDq0zny5vFU',
        title: 'Qual o melhor espaçamento?',
        duration: '04:15 min',
        badge: 'Decisão Estratégica',
        coverTheme: 'earth',
        summary:
          'O vídeo explica que a definição do espaçamento é uma decisão estratégica e permanente na cajucultura, pois determina a densidade de plantas por hectare e o manejo técnico a longo prazo.',
      },
      {
        id: 'plantio-v2',
        videoId: 'AIbbAiD0iUQ',
        title: 'Plantio do Cajueiros',
        duration: '05:40 min',
        badge: 'Guia Técnico',
        coverTheme: 'green',
        summary:
          'Este vídeo apresenta dicas fundamentais para o plantio e o pós-plantio do cajueiro, com foco em garantir um pomar produtivo e rentável. O engenheiro agrônomo Vitor Oliveira detalha as etapas essenciais para o sucesso da cultura.',
      },
    ],
  },

  irrigacao: {
    id: 'irrigacao',
    route: '/(tabs)/cultivo/irrigacao',
    title: 'Irrigação e Recursos Hídricos',
    subtitle: 'Manejo de água em clima semiárido, gotejamento e microaspersão eficiente.',
    icon: 'droplet',
    badge: 'Eficiência Hídrica',
    intro:
      'Embora o cajueiro seja rústico e tolerante ao estresse hídrico, a irrigação nos primeiros anos e nos períodos críticos de floração e frutificação eleva drasticamente a produtividade das castanhas e a qualidade dos pedúnculos. No semiárido, o método por gotejamento ou microaspersão garante eficiência superior a 90% no uso da água.',
    orientacoes: [
      'Método prioritário: Irrigação localizada por microaspersão (1 emissor por planta) ou gotejamento (2 linhas com gotejadores autocompensantes).',
      'Fase jovem (ano 1): Fornecer de 15 a 25 litros de água por planta em turnos de 2 a 3 vezes por semana.',
      'Fase produtiva (a partir do 3º ano): Durante a florada e enchimento do fruto (agosto a novembro), aplicar de 60 a 100 litros de água por planta por dia.',
      'Monitoramento: Avaliar a umidade do solo com trado ou tensiômetros na profundidade de 20 a 40 cm.',
      'Manejo de turno: Irrigar preferencialmente nas primeiras horas da manhã ou ao entardecer para reduzir perdas por evapotranspiração sob altas temperaturas.',
    ],
    videos: [],
    infographics: [
      {
        id: 'irrigacao-info-1',
        title: 'Infográfico: Manejo Hídrico e Irrigação do Cajueiro',
        subtitle: 'Parâmetros de lâmina d’água e turno de rega para o semiárido',
        image: require('../assets/irrigacao1.jpg'),
        description:
          'Guia visual técnico com recomendações agronômicas detalhadas sobre a demanda hídrica do cajueiro-anão precoce nas diferentes fases fenológicas.',
      },
      {
        id: 'irrigacao-info-2',
        title: 'Infográfico: Dimensionamento e Eficiência no Uso da Água',
        subtitle: 'Sistemas de gotejamento e microaspersão sustentáveis',
        image: require('../assets/irrigacao2.jpg'),
        description:
          'Esquema prático demonstrando o posicionamento dos emissores na projeção da copa e diretrizes de conservação de água em condições de seca.',
      },
    ],
  },

  poda: {
    id: 'poda',
    route: '/(tabs)/cultivo/poda',
    title: 'Poda e Adubação',
    subtitle: 'Poda de formação, limpeza fitossanitária e adubação orgânica e química.',
    icon: 'scissors',
    badge: 'Manejo Produtivo',
    intro:
      'A poda adequada confere arquitetura equilibrada à copa, facilitando tratos fitossanitários e a colheita manual do pedúnculo íntegro. Já a adubação de manutenção repõe os nutrientes extraídos na colheita da castanha e do caju, sustentando altas safras ano após ano.',
    orientacoes: [
      'Poda de formação: Realizada no 1º e 2º ano; desbrotas do porta-enxerto e despontamento da haste principal a cerca de 60-80 cm do solo para estimular 3 a 4 ramos primários bem distribuídos.',
      'Poda de limpeza: Eliminar galhos secos, quebrados, doentes, ladrões ou cruzados que bloqueiem a penetração de luz solar no interior da copa.',
      'Poda de rebaixamento: Em pomares adultos com fechamento excessivo de entrelinhas, realizar logo após o término da safra (janeiro/fevereiro).',
      'Desinfecção de ferramentas: Esterilizar tesouras e serrotes com solução de hipoclorito a 2% e cicatrizar cortes grossos com pasta bordalesa.',
      'Adubação de cobertura: Parcelar o Nitrogênio e Potássio em 2 a 3 aplicações durante a estação chuvosa ou via fertirrigação.',
    ],
    videos: [
      {
        id: 'poda-v1',
        videoId: 'SRnrqoLS-jI',
        title: 'Como Podar o Cajueiro Anão',
        duration: '05:20 min',
        badge: 'Guia Prático',
        coverTheme: 'earth',
        summary:
          'Este vídeo é um guia prático sobre a poda do cajueiro anão, essencial para aumentar a produtividade e a longevidade do pomar. O processo foca em acelerar a renovação natural da planta, garantindo melhor entrada de luz e saúde fitossanitária.',
      },
    ],
  },

  pragas: {
    id: 'pragas',
    route: '/(tabs)/cultivo/pragas',
    title: 'Controle de Pragas e Doenças',
    subtitle: 'Identificação e controle de traça-das-castanhas, broca-das-pontas e antracnose.',
    icon: 'shield',
    badge: 'Sanidade Vegetal',
    intro:
      'O monitoramento constante é o pilar do Manejo Integrado de Pragas e Doenças (MIP). Ações preventivas reduzem a necessidade de defensivos químicos e mantêm o equilíbrio biológico do ecossistema agrícola, protegendo polinizadores naturais como as abelhas nativas do semiárido.',
    orientacoes: [
      'Broca-das-pontas (Anthistarcha binocularis): Provoca seca dos brotos apicais e perda da florada; podar os ramos infestados cerca de 10 cm abaixo da lesão e queimar o material podado.',
      'Traça-das-castanhas: Perfura a castanha jovem; monitorar a formação das primeiras castanhas e manter armadilhas etológicas de feromônio.',
      'Antracnose (Colletotrichum gloeosporioides): Causa manchas necróticas em folhas, flores e frutos; manejar aeração da copa através da poda e pulverizar calda cúprica/bordalesa preventivamente.',
      'Mofo-preto: Doença fúngica associada à alta umidade da folhagem; controlar através de espaçamento adequado e circulação de ar.',
      'Segurança do aplicador: Utilizar sempre EPI completo nas pulverizações e respeitar rigorosamente o período de carência pré-colheita.',
    ],
    videos: [
      {
        id: 'pragas-v1',
        videoId: 'blRMuwkTGWA',
        title: 'Antracnose no cajueiro',
        duration: '05:05 min',
        badge: 'Sanidade e Doenças',
        coverTheme: 'orange',
        summary:
          'Este vídeo aborda a antracnose, uma doença fúngica que afeta severamente a produção de cajueiros, especialmente na agricultura familiar em condições de alta umidade e temperatura .',
      },
      {
        id: 'pragas-v2',
        videoId: 'yvG0ypRVY9w',
        title: 'Pragas do cajueiro: quando iniciar o controle químico?',
        duration: '06:30 min',
        badge: 'Manejo Integrado',
        coverTheme: 'green',
        summary:
          'Neste vídeo, o agrônomo Vitor Oliveira explica os critérios que os cajucultores devem observar antes de iniciar o controle químico das pragas do cajueiro. O foco principal é evitar aplicações desnecessárias de defensivos, prezando pela sustentabilidade da lavoura.',
      },
    ],
  },
};

export const cultivoService = {
  getStageById(id: CultivoStageId): CultivoStage | undefined {
    return CULTIVO_STAGES_DATA[id];
  },

  getAllStages(): CultivoStage[] {
    return Object.values(CULTIVO_STAGES_DATA);
  },
};
