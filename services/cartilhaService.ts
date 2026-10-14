import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartilhaChapter, CartilhaMetadata } from '../types/cartilha';

const CARTILHA_OFFLINE_KEY = '@cajutech:cartilha_offline_status';
const CARTILHA_SAVED_DATE_KEY = '@cajutech:cartilha_saved_date';

const LOCAL_CHAPTERS: CartilhaChapter[] = [
  {
    id: 'cap1',
    number: 1,
    title: 'A Cajucultura no Semiárido Piauiense',
    subtitle: 'Importância socioeconômica, clima e potencial do cajueiro-anão precoce',
    readingTimeMinutes: 6,
    iconName: 'sun',
    summary: 'Panorama da cajucultura sustentável, vantagens agronômicas do clone precoce e adaptação às secas periódicas.',
    subsections: [
      {
        title: '1.1 A Força do Cajueiro na Agricultura Familiar',
        content: 'O cajueiro (Anacardium occidentale L.) é uma das espécies mais resilientes e representativas do semiárido brasileiro. Em municípios como Piripiri, Picos e redondezas, a cultura movimenta cooperativas familiares, garante renda em períodos de estiagem e gera alimentos de alto valor biológico através da castanha e do pedúnculo.',
        highlightTips: [
          'Planta rústica e com sistema radicular profundo adaptado a solos arenosos.',
          'Floração e safra ocorrem predominantemente no segundo semestre (período de estiagem).',
        ],
      },
      {
        title: '1.2 Vantagens do Cajueiro-Anão Precoce',
        content: 'Diferente do cajueiro comum (porte gigante), o cajueiro-anão precoce inicia a frutificação já no primeiro ou segundo ano após o plantio, atinge altura máxima de 3 a 5 metros e facilita enormemente a colheita manual e as podas com segurança ao trabalhador rural.',
        fieldWarning: 'Mudas de semente desuniformes atrasam a colheita. Adquira sempre mudas enxertadas certificadas pela Embrapa.',
      },
    ],
  },
  {
    id: 'cap2',
    number: 2,
    title: 'Seleção de Mudas, Clones e Plantio',
    subtitle: 'Clones recomendados, preparo de covas e época ideal de plantio',
    readingTimeMinutes: 8,
    iconName: 'sprout',
    summary: 'Como escolher clones resistentes (BRS 189, BRS 226, CCP 76) e realizar o plantio na abertura da estação chuvosa.',
    subsections: [
      {
        title: '2.1 Principais Clones Recomendados',
        content: 'Os clones mais adaptados ao Piauí e Ceará incluem: BRS 226 (excelente para pedúnculo de mesa e cajuína), CCP 76 (dupla aptidão com alta produção de castanha) e BRS 189 (elevada tolerância ao estresse hídrico e castanha de calibre graúdo).',
        highlightTips: [
          'CCP 76: Casca avermelhada, pedúnculo doce e firme.',
          'BRS 226: Pedúnculo amarelo, baixo teor de taninos, preferido para sucos.',
        ],
      },
      {
        title: '2.2 Preparo do Solo e Dimensões da Cova',
        content: 'As covas devem ser abertas com dimensões mínimas de 40 x 40 x 40 cm. Separe os primeiros 20 cm de terra da superfície (mais fértil) da terra do fundo. Misture a terra superior com 10 a 15 litros de esterco de curral bem curtido e 200g de superfosfato simples.',
        fieldWarning: 'Nunca adube com esterco fresco ou químico diretamente encostado no colo da muda recém-plantada.',
      },
    ],
  },
  {
    id: 'cap3',
    number: 3,
    title: 'Manejo Hídrico e Irrigação Eficiente',
    subtitle: 'Economia de água com gotejamento e microaspersão no semiárido',
    readingTimeMinutes: 7,
    iconName: 'droplet',
    summary: 'Técnicas de irrigação localizada que economizam até 60% de água e garantem alta produtividade no enchimento do fruto.',
    subsections: [
      {
        title: '3.1 Importância da Lâmina d’Água nas Fases Críticas',
        content: 'O cajueiro tolera seca prolongada, mas a produtividade comercial é multiplicada com irrigação suplementar. As fases de maior demanda hídrica são a brotação vegetativa pré-floração e o enchimento conjunto da castanha e do pedúnculo.',
        highlightTips: [
          'Gotejamento em linha com 2 a 4 emissores por planta adulta.',
          'Aplicação nas primeiras horas da manhã ou ao entardecer para reduzir evaporação.',
        ],
      },
      {
        title: '3.2 Cobertura Morta (Mulching) e Retenção de Umidade',
        content: 'O uso de palhada seca de gramíneas, folhas ou restos de poda triturados na projeção da copa mantém o solo úmido, reduz a temperatura radicular em até 4°C e inibe o crescimento de ervas daninhas competidoras.',
        fieldWarning: 'Mantenha uma distância de 15 cm livre ao redor do tronco para evitar umidade excessiva e gomose.',
      },
    ],
  },
  {
    id: 'cap4',
    number: 4,
    title: 'Poda de Formação, Produção e Limpeza',
    subtitle: 'Passo a passo das podas que renovam a copa e abrem entrada de luz',
    readingTimeMinutes: 9,
    iconName: 'scissors',
    summary: 'Como conduzir o cajueiro desde a muda jovem até o pomar adulto para maximizar a área fotossintética e ventilação.',
    subsections: [
      {
        title: '4.1 Poda de Formação (1º ao 2º ano)',
        content: 'Elimine os ramos ladrões e brotações abaixo do ponto de enxerto (cavalo). Conduza a haste principal até cerca de 60 a 80 cm do solo, despontando o ápice para forçar a ramificação em 3 a 4 ramos secundários bem distribuídos em forma de taça.',
        highlightTips: [
          'Desbrote com as mãos quando os rebentos estiverem tenros para cicatrizar rápido.',
          'Mantenha o tronco livre até a altura da copa para facilitar o trânsito.',
        ],
      },
      {
        title: '4.2 Poda de Limpeza Anual (Pós-Safra)',
        content: 'Logo após o fim da safra, retire todos os ramos secos, galhos cruzados internos e ramos atacados por brocas ou fungos. Isso permite que a luz solar chegue ao centro da copa e reduz o abrigo de pragas.',
        fieldWarning: 'Sempre faça cortes chanfrados (inclinados) para que a água da chuva escorra e não acumule no toco cortado.',
      },
    ],
  },
  {
    id: 'cap5',
    number: 5,
    title: 'Manejo Integrado de Pragas e Doenças',
    subtitle: 'Identificação e controle da Broca-das-pontas, Oídio e Antracnose',
    readingTimeMinutes: 10,
    iconName: 'shield',
    summary: 'Práticas preventivas e de controle biológico/químico consciente para proteger a flor e a frutificação.',
    subsections: [
      {
        title: '5.1 Broca-das-Pontas (Anthistarcha binocularis)',
        content: 'A lagarta penetra no broto jovem, secando a panícula floral. O sinal clássico é o ponteiro seco com orifício e exsudação de resina escura. O controle cultural mais eficaz é a poda e queima imediata dos ramos infestados.',
        highlightTips: [
          'Monitoramento semanal durante o período de emissão foliar.',
          'Uso de feromônios ou inseticidas seletivos apenas em níveis de dano econômico.',
        ],
      },
      {
        title: '5.2 Oídio do Cajueiro (Pseudoidium anacardii)',
        content: 'Fungo que cobre inflorescências e folhas jovens com uma camada esbranquiçada. Causa abortamento floral massivo. O controle preventivo com enxofre em pó ou formulações solúveis na emissão das primeiras panículas é indispensável.',
        fieldWarning: 'Não aplique enxofre nos horários de sol a pino (acima de 32°C) para não provocar queima foliar.',
      },
    ],
  },
  {
    id: 'cap6',
    number: 6,
    title: 'Colheita, Pós-Colheita e Valor Agregado',
    subtitle: 'Ponto de colheita, cajuína, doces, castanha e fibra vegetal',
    readingTimeMinutes: 8,
    iconName: 'package',
    summary: 'Aproveitamento de 100% do fruto para erradicar o desperdício do pedúnculo e gerar renda cooperativa sustentável.',
    subsections: [
      {
        title: '6.1 Cuidados na Colheita para Mercado de Mesa e Agroindústria',
        content: 'Colha pela manhã, segurando o pedúnculo e girando levemente para desprender do ramo. Não puxe a castanha. Frutos que caem no chão sofrem injúrias mecânicas e fermentam em poucas horas, devendo ser encaminhados rapidamente para suco ou cajuína.',
        highlightTips: [
          'Utilize caixas plásticas higienizadas com no máximo 2 a 3 camadas de frutos.',
          'Separe a castanha do pedúnculo com torção firme de corte rente.',
        ],
      },
      {
        title: '6.2 A Cadeia de Valor: Da Cajuína à Carne de Caju',
        content: 'A cada 100 kg de caju colhidos, cerca de 90 kg correspondem ao pedúnculo. Com clarificação por gelatina, produz-se a autêntica cajuína sem álcool e rica em vitamina C. A polpa residual (bagaço) prensada torna-se farinha, hambúrguer de caju e doces em calda.',
        fieldWarning: 'A garrafa de cajuína deve ter tampa de coroa estéril e passar por banho-maria de pelo menos 60 minutos.',
      },
    ],
  },
];

export const cartilhaService = {
  async getMetadata(): Promise<CartilhaMetadata> {
    const isSaved = await this.isOfflineSaved();
    let savedAt: string | undefined;

    try {
      savedAt = (await AsyncStorage.getItem(CARTILHA_SAVED_DATE_KEY)) || undefined;
    } catch {
      // Ignora erro
    }

    return {
      title: 'Cartilha Técnica da Cajucultura no Semiárido',
      version: 'Edição 2.0 (Atualizada)',
      author: 'CajuTech Agroecologia & Extensão Rural',
      editionYear: 2026,
      region: 'Semiárido Piauiense / Nordeste Brasileiro',
      isSavedOffline: isSaved,
      savedAt,
      totalChapters: LOCAL_CHAPTERS.length,
    };
  },

  async getChapters(): Promise<CartilhaChapter[]> {
    // Delay suave (< 300ms) para renderização com skeleton suave
    await new Promise((resolve) => setTimeout(resolve, 200));
    return LOCAL_CHAPTERS;
  },

  async getChapterById(id: string): Promise<CartilhaChapter | null> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const ch = LOCAL_CHAPTERS.find((c) => c.id === id);
    return ch || null;
  },

  async isOfflineSaved(): Promise<boolean> {
    try {
      const val = await AsyncStorage.getItem(CARTILHA_OFFLINE_KEY);
      return val === 'true';
    } catch {
      return true; // Por padrão os dados locais já estão embutidos
    }
  },

  async toggleOfflineDownload(): Promise<boolean> {
    try {
      const current = await this.isOfflineSaved();
      const nextState = !current;
      await AsyncStorage.setItem(CARTILHA_OFFLINE_KEY, nextState ? 'true' : 'false');
      if (nextState) {
        await AsyncStorage.setItem(
          CARTILHA_SAVED_DATE_KEY,
          new Date().toLocaleDateString('pt-BR')
        );
      } else {
        await AsyncStorage.removeItem(CARTILHA_SAVED_DATE_KEY);
      }
      return nextState;
    } catch (e) {
      console.warn('Erro ao salvar status offline da cartilha:', e);
      return false;
    }
  },
};
