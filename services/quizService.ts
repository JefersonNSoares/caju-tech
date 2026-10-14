import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  QuizQuestion,
  QuizCategory,
  QuizBadge,
  QuizStats,
  QuizResultRecord,
} from '../types/quiz';

const QUIZ_STATS_KEY = '@cajutech:quiz_stats';
const QUIZ_HISTORY_KEY = '@cajutech:quiz_history';

export const QUIZ_BADGES: QuizBadge[] = [
  {
    id: 'iniciante',
    title: 'Amigo do Pomar',
    description: 'Completou a primeira rodada do quiz com aprendizado rural.',
    iconName: 'award',
    requiredPercentage: 40,
  },
  {
    id: 'pratico',
    title: 'Manejo Consciente',
    description: 'Alcançou 60% ou mais de acertos nas boas práticas agronômicas.',
    iconName: 'check-circle',
    requiredPercentage: 60,
  },
  {
    id: 'especialista',
    title: 'Mestre da Cajucultura',
    description: 'Acertou 80% ou mais demonstrando alto domínio da cultura.',
    iconName: 'star',
    requiredPercentage: 80,
  },
  {
    id: 'guardiao',
    title: 'Guardião do Semiárido',
    description: 'Gabaritou o desafio com 100% de precisão técnica no campo.',
    iconName: 'shield',
    requiredPercentage: 100,
  },
];

const LOCAL_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'manejo',
    categoryLabel: 'Manejo e Plantio',
    difficulty: 'basico',
    question: 'Qual é o espaçamento mais recomendado para o cajueiro-anão precoce em regime de sequeiro no semiárido?',
    options: [
      { id: 'opt_a', text: '7m x 7m ou 8m x 6m (cerca de 204 a 208 plantas/ha)' },
      { id: 'opt_b', text: '2m x 2m (alta densidade contínua)' },
      { id: 'opt_c', text: '15m x 15m (sistema florestal aberto)' },
      { id: 'opt_d', text: '4m x 2m (sem espaçamento entre linhas)' },
    ],
    correctOptionId: 'opt_a',
    explanation: 'No semiárido de sequeiro, espaçamentos como 7m x 7m ou 8m x 6m evitam competição hídrica excessiva e permitem a passagem de implementos para roçagem.',
    fieldTip: 'Mantenha o coroamento das mudas sempre limpo nos primeiros 24 meses.',
  },
  {
    id: 'q2',
    category: 'manejo',
    categoryLabel: 'Manejo e Poda',
    difficulty: 'intermediario',
    question: 'Em que período do ano é indicada a realização da poda de limpeza e desponte no cajueiro-anão?',
    options: [
      { id: 'opt_a', text: 'No pico da floração com ramos cheios de abelhas' },
      { id: 'opt_b', text: 'Logo após o término da safra, antes das primeiras chuvas' },
      { id: 'opt_c', text: 'Em dias de chuva intensa contínua' },
      { id: 'opt_d', text: 'Apenas uma vez a cada 10 anos' },
    ],
    correctOptionId: 'opt_b',
    explanation: 'A poda deve ocorrer logo após a colheita, no período seco, para cicatrizar os cortes rapidamente e estimular os ramos produtivos para a floração seguinte.',
    fieldTip: 'Desinfete o serrote de poda com hipoclorito a 2% entre uma planta e outra.',
  },
  {
    id: 'q3',
    category: 'pragas',
    categoryLabel: 'Controle de Pragas',
    difficulty: 'intermediario',
    question: 'Qual sintoma característico no ponteiro indica o ataque da broca-das-pontas (Anthistarcha binocularis)?',
    options: [
      { id: 'opt_a', text: 'Secamento do ponteiro com emissão de goma e orifício de entrada' },
      { id: 'opt_b', text: 'Folhas ficando completamente esbranquiçadas e aveludadas' },
      { id: 'opt_c', text: 'Castanhas caindo ainda verdes com cheiro de fermentado' },
      { id: 'opt_d', text: 'Tronco descascando sem presença de furos ou seiva' },
    ],
    correctOptionId: 'opt_a',
    explanation: 'A lagarta da broca penetra no broto terminal, causando secamento das pontas e exsudação de resina/goma típica, reduzindo a emissão de panículas florais.',
    fieldTip: 'Corte e queime os ponteiros atacados cerca de 5 cm abaixo da área lesionada.',
  },
  {
    id: 'q4',
    category: 'pragas',
    categoryLabel: 'Controle de Doenças',
    difficulty: 'basico',
    question: 'O oídio do cajueiro (Pseudoidium anacardii) causa aspecto de pó branco nas folhas e flores. Qual condição climática favorece essa doença?',
    options: [
      { id: 'opt_a', text: 'Dias quentes com noites frias e umidade relativa noturna elevada' },
      { id: 'opt_b', text: 'Seca extrema contínua sem nenhuma umidade relativa' },
      { id: 'opt_c', text: 'Inundação total do solo por mais de 30 dias' },
      { id: 'opt_d', text: 'Altas temperaturas acima de 45°C com ventos secos' },
    ],
    correctOptionId: 'opt_a',
    explanation: 'A oscilação térmica entre o calor diurno e noites com orvalho/umidade no semiárido favorece a germinação e propagação dos esporos do oídio.',
    fieldTip: 'O enxofre solúvel ou caldas protetoras devem ser aplicados preventivamente na emissão das panículas.',
  },
  {
    id: 'q5',
    category: 'derivados',
    categoryLabel: 'Derivados e Pós-Colheita',
    difficulty: 'intermediario',
    question: 'Qual é a função do agente clarificante (como a gelatina alimentícia) na produção artesanal da cajuína?',
    options: [
      { id: 'opt_a', text: 'Adoçar a cajuína para dispensar o açúcar cristal' },
      { id: 'opt_b', text: 'Precipitar o tanino e as proteínas, eliminando a adstringência' },
      { id: 'opt_c', text: 'Colorir o suco para deixá-lo com tom amarelo claro' },
      { id: 'opt_d', text: 'Acelerar o processo de fermentação alcoólica' },
    ],
    correctOptionId: 'opt_b',
    explanation: 'A gelatina liga-se aos taninos do suco, formando flocos que decantam. Ao filtrar, obtém-se o líquido translúcido característico sem o travor adstringente.',
    fieldTip: 'A cor âmbar da cajuína surge da caramelização natural dos açúcares no banho-maria.',
  },
  {
    id: 'q6',
    category: 'derivados',
    categoryLabel: 'Aproveitamento Integral',
    difficulty: 'basico',
    question: 'Após a prensagem do suco do pedúnculo, como o bagaço residual pode ser valorizado economicamente?',
    options: [
      { id: 'opt_a', text: 'Processamento em fibra de caju ("carne vegetal"), doces ou ração animal rica' },
      { id: 'opt_b', text: 'Descarte obrigatório em valas de lixo comum' },
      { id: 'opt_c', text: 'Uso imediato como veneno natural de formigas cortadeiras' },
      { id: 'opt_d', text: 'Queima ao ar livre para espantar morcegos' },
    ],
    correctOptionId: 'opt_a',
    explanation: 'O bagaço é riquíssimo em fibras e sais. Lavado e desodorizado, transforma-se em hambúrgueres vegetais, paçocas, doces cristalizados e suplementação animal.',
    fieldTip: 'Cada 100 kg de pedúnculo rendem cerca de 20 a 25 kg de bagaço prensado de alto valor nutritivo.',
  },
  {
    id: 'q7',
    category: 'manejo',
    categoryLabel: 'Manejo Hídrico',
    difficulty: 'intermediario',
    question: 'Qual método de irrigação é mais eficiente e recomendado para pomares de cajueiro no semiárido?',
    options: [
      { id: 'opt_a', text: 'Irrigação localizada por gotejamento ou microaspersão' },
      { id: 'opt_b', text: 'Inundação total de tabuleiros' },
      { id: 'opt_c', text: 'Aspersão de canhão alto molhando todo o arvoredo ao meio-dia' },
      { id: 'opt_d', text: 'Sulcos abertos com água corrente livre' },
    ],
    correctOptionId: 'opt_a',
    explanation: 'A irrigação localizada economiza até 60% de água, aplica a lâmina diretamente na zona radicular e reduz a incidência de fungos nas folhas e inflorescências.',
    fieldTip: 'Na fase de enchimento da castanha e pedúnculo, o estresse hídrico reduz o tamanho do fruto.',
  },
  {
    id: 'q8',
    category: 'derivados',
    categoryLabel: 'Beneficiamento da Castanha',
    difficulty: 'avancado',
    question: 'Qual cuidado de segurança primordial deve ser adotado na quebra e corte da castanha para extração da amêndoa?',
    options: [
      { id: 'opt_a', text: 'Uso de EPIs e neutralização do LCC cáustico da casca com cal ou óleo protetor' },
      { id: 'opt_b', text: 'Lavar as mãos apenas com água morna antes e depois' },
      { id: 'opt_c', text: 'Partir as castanhas diretamente com os dentes' },
      { id: 'opt_d', text: 'Manusear a castanha crua esmagando a casca com as palmas desprotegidas' },
    ],
    correctOptionId: 'opt_a',
    explanation: 'O Líquido da Casca da Castanha (LCC) contém anacárdico e cardol, altamente corrosivos à pele humana. O operador deve usar luvas adequadas ou neutralizantes.',
    fieldTip: 'O LCC recuperado no processo industrial é subproduto nobre para resinas e freios.',
  },
  {
    id: 'q9',
    category: 'manejo',
    categoryLabel: 'Propagação e Enxertia',
    difficulty: 'avancado',
    question: 'Qual é o tipo de enxertia mais utilizado na formação de mudas clonais de cajueiro-anão precoce?',
    options: [
      { id: 'opt_a', text: 'Garfagem em fenda cheia' },
      { id: 'opt_b', text: 'Alporquia aérea invertida' },
      { id: 'opt_c', text: 'Brotamento subterrâneo' },
      { id: 'opt_d', text: 'Mergulhia simples de raiz' },
    ],
    correctOptionId: 'opt_a',
    explanation: 'A garfagem em fenda cheia em porta-enxertos de 40 a 60 dias apresenta pegamento superior a 85% e uniformidade genética total no pomar.',
    fieldTip: 'Use fita plástica transparente para proteger o ponto de enxerto contra a perda de umidade.',
  },
  {
    id: 'q10',
    category: 'pragas',
    categoryLabel: 'Pragas Secundárias',
    difficulty: 'intermediario',
    question: 'O tripes-do-cajueiro (Selenothrips rubrocinctus) ataca principalmente a face inferior das folhas. Qual sinal de dano é observado no campo?',
    options: [
      { id: 'opt_a', text: 'Folhas com tonalidade prateada a bronzeada e pontuações pretas de fezes' },
      { id: 'opt_b', text: 'Galhos quebrando com vento fraco' },
      { id: 'opt_c', text: 'Formação de galhas avermelhadas na raiz' },
      { id: 'opt_d', text: 'Frutos com polpa endurecida como madeira' },
    ],
    correctOptionId: 'opt_a',
    explanation: 'Os tripes raspam o tecido vegetal sugando a seiva, conferindo o aspecto bronzeado/prateado e reduzindo drasticamente a capacidade fotossintética.',
    fieldTip: 'O monitoramento periódico sob as folhas na estiagem antecipa a intervenção.',
  },
  {
    id: 'q11',
    category: 'derivados',
    categoryLabel: 'Qualidade e Higiene',
    difficulty: 'basico',
    question: 'Na recepção do pedúnculo para fabricação de doces e polpas, qual o tempo máximo ideal entre a colheita e o início do processamento?',
    options: [
      { id: 'opt_a', text: 'Até 24 horas sob abrigo do sol, evitando fermentação precoce' },
      { id: 'opt_b', text: 'Até 2 semanas exposto ao sol quente no chão batido' },
      { id: 'opt_c', text: 'Pelo menos 10 dias para que o pedúnculo amoleça totalmente' },
      { id: 'opt_d', text: 'Não há limite de tempo pois o caju nunca azeda' },
    ],
    correctOptionId: 'opt_a',
    explanation: 'O pedúnculo é extremamente perecível. Devido à alta umidade e açúcares livres, a fermentação espontânea inicia-se rapidamente sob calor se não processado.',
    fieldTip: 'Colha os frutos com caixas plásticas vazadas higienizadas, evitando empilhamento excessivo.',
  },
  {
    id: 'q12',
    category: 'manejo',
    categoryLabel: 'Colheita e Ponto de Maturação',
    difficulty: 'basico',
    question: 'Como reconhecer no campo que a castanha e o pedúnculo alcançaram o ponto ideal de colheita?',
    options: [
      { id: 'opt_a', text: 'Coloração característica do clone, consistência firme e desprendimento fácil do ramo' },
      { id: 'opt_b', text: 'Castanha mole e pedúnculo ainda verde-claro' },
      { id: 'opt_c', text: 'Queda espontânea no chão já apodrecendo' },
      { id: 'opt_d', text: 'Quando as folhas do cajueiro secarem por completo' },
    ],
    correctOptionId: 'opt_a',
    explanation: 'Para frutos de mesa e cajuína, a colheita manual no ponto de maturação fisiológica assegura o melhor brix (açúcares) e evita lesões por impacto no solo.',
    fieldTip: 'Colha nas horas mais frescas da manhã para manter a temperatura do fruto baixa.',
  },
];

export const quizService = {
  /**
   * Retorna perguntas filtradas por categoria e embaralhadas
   */
  async getQuestions(category: QuizCategory = 'todas', count: number = 5): Promise<QuizQuestion[]> {
    // Delay suave (< 300ms) para simular carregamento local seguro e permitir skeleton
    await new Promise((resolve) => setTimeout(resolve, 220));

    let pool = [...LOCAL_QUESTIONS];
    if (category !== 'todas') {
      pool = pool.filter((q) => q.category === category);
      if (pool.length === 0) {
        pool = [...LOCAL_QUESTIONS];
      }
    }

    // Embaralha para variar entre rodadas
    const shuffled = pool.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  },

  /**
   * Obtém estatísticas e medalhas salvas no armazenamento local
   */
  async getQuizStats(): Promise<QuizStats> {
    try {
      const raw = await AsyncStorage.getItem(QUIZ_STATS_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      // Fallback offline seguro
    }

    return {
      totalRounds: 0,
      bestPercentage: 0,
      totalCorrect: 0,
      totalAnswered: 0,
      unlockedBadgeIds: [],
    };
  },

  /**
   * Salva o resultado de uma rodada e recalcula medalhas desbloqueadas
   */
  async saveQuizResult(
    result: Omit<QuizResultRecord, 'id' | 'date'>
  ): Promise<QuizResultRecord> {
    const stats = await this.getQuizStats();

    const percentage = Math.round((result.score / result.totalQuestions) * 100);

    // Identifica nova medalha baseada no percentual
    const eligibleBadges = QUIZ_BADGES.filter(
      (b) => percentage >= b.requiredPercentage
    );
    const highestBadge = eligibleBadges[eligibleBadges.length - 1];

    const currentBadges = new Set(stats.unlockedBadgeIds);
    if (highestBadge) {
      currentBadges.add(highestBadge.id);
    }

    const updatedStats: QuizStats = {
      totalRounds: stats.totalRounds + 1,
      bestPercentage: Math.max(stats.bestPercentage, percentage),
      totalCorrect: stats.totalCorrect + result.score,
      totalAnswered: stats.totalAnswered + result.totalQuestions,
      unlockedBadgeIds: Array.from(currentBadges),
    };

    const record: QuizResultRecord = {
      ...result,
      id: `quiz_${Date.now()}`,
      date: new Date().toISOString(),
      percentage,
      badgeEarned: highestBadge,
    };

    try {
      await AsyncStorage.setItem(QUIZ_STATS_KEY, JSON.stringify(updatedStats));

      const historyRaw = await AsyncStorage.getItem(QUIZ_HISTORY_KEY);
      const history: QuizResultRecord[] = historyRaw ? JSON.parse(historyRaw) : [];
      history.unshift(record);
      // Mantém últimos 20 registros
      await AsyncStorage.setItem(
        QUIZ_HISTORY_KEY,
        JSON.stringify(history.slice(0, 20))
      );
    } catch (e) {
      console.warn('Falha ao persistir quiz no AsyncStorage:', e);
    }

    return record;
  },

  getBadges(): QuizBadge[] {
    return QUIZ_BADGES;
  },

  async resetQuizHistory(): Promise<void> {
    try {
      await AsyncStorage.removeItem(QUIZ_STATS_KEY);
      await AsyncStorage.removeItem(QUIZ_HISTORY_KEY);
    } catch {
      // Ignora erro
    }
  },
};
