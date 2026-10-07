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
        title: 'Coveamento, Calagem e Adubação de Fundação',
        duration: '04:15 min',
        badge: 'Técnica Prática',
        coverTheme: 'earth',
        summary:
          'Demonstração passo a passo da abertura de covas nas dimensões ideais de 40x40x40 cm, separação da camada superficial de solo rico em matéria orgânica, incorporação uniforme de calcário dolomítico e adubação orgânica fosfatada. Apresenta o tempo necessário de repouso antes do plantio da muda.',
      },
      {
        id: 'plantio-v2',
        title: 'Plantio da Muda Enxertada e Alinhamento no Campo',
        duration: '05:40 min',
        badge: 'Passo a Passo',
        coverTheme: 'green',
        summary:
          'Guia visual de retirada do saco plástico da muda sem desmanchar o torrão, posicionamento do colo da planta, alinhamento com piquetes de espaçamento 7m x 7m e primeiro molhamento abundante para eliminação de bolsas de ar ao redor das raízes.',
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
    videos: [
      {
        id: 'irrigacao-v1',
        title: 'Instalação de Sistema de Gotejamento no Pomar',
        duration: '06:10 min',
        badge: 'Infraestrutura',
        coverTheme: 'green',
        summary:
          'Apresenta o esquema de distribuição hidráulica com cabeçal de filtragem simples, tubulações de polietileno de baixa densidade e posicionamento correto dos emissores junto à projeção da copa das árvores em desenvolvimento.',
      },
      {
        id: 'irrigacao-v2',
        title: 'Manejo da Lâmina d’Água nas Estações Secas',
        duration: '04:55 min',
        badge: 'Gestão da Água',
        coverTheme: 'orange',
        summary:
          'Explica como calcular a necessidade diária de reposição hídrica com base na evapotranspiração de Piripiri-PI e região, evitando tanto o desperdício quanto o estresse excessivo que provoca abortamento de flores no cajueiro.',
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
        title: 'Técnica Correta de Poda de Formação e Limpeza',
        duration: '05:20 min',
        badge: 'Manejo Prático',
        coverTheme: 'earth',
        summary:
          'Demonstração em campo de como selecionar os ramos primários, ângulo de corte bisel para evitar acúmulo de umidade, desbrota rente ao tronco e aplicação da calda cicatrizante protetora nos ferimentos vegetais.',
      },
      {
        id: 'poda-v2',
        title: 'Adubação de Produção: Épocas, Doses e Aplicação',
        duration: '04:45 min',
        badge: 'Nutrição Vegetal',
        coverTheme: 'yellow',
        summary:
          'Orientação detalhada sobre a faixa de aplicação de fertilizantes sob a projeção da copa, incorporação superficial e sinergia entre matéria orgânica local (cama de frango/esterco) e adubação mineral equilibrada NPK.',
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
        title: 'Identificação e Combate à Broca-das-Pontas',
        duration: '05:05 min',
        badge: 'Diagnóstico em Campo',
        coverTheme: 'orange',
        summary:
          'Instrução prática para reconhecer os sintomas iniciais da broca nos brotos jovens, presença de exsudação e serragem, e procedimentos fitossanitários mecânicos e culturais imediatos para contenção do foco.',
      },
      {
        id: 'pragas-v2',
        title: 'Controle Agroecológico de Antracnose com Calda Bordalesa',
        duration: '06:30 min',
        badge: 'Tratamento Preventivo',
        coverTheme: 'green',
        summary:
          'Passo a passo do preparo da tradicional calda bordalesa (sulfato de cobre + cal virgem), teste de neutralidade com lâmina de ferro e técnicas de aplicação uniforme nos períodos que antecedem a florada.',
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
