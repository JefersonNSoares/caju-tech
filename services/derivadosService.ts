import { DerivadoDetail } from '../types/derivados';

export const DERIVADOS_DATA: DerivadoDetail[] = [
  {
    id: 'cajuina',
    title: 'Cajuína Tradicional Piauiense',
    tag: 'Patrimônio Cultural',
    icon: 'coffee',
    materiaPrimaPrincipal: 'Pedúnculo (Falso Fruto)',
    tempoMedio: '3 a 4 horas',
    dificuldade: 'Média',
    descricao:
      'Bebida não alcoólica, límpida e de coloração âmbar caramelizada, obtida do suco clarificado do pedúnculo do caju. Reconhecida como Patrimônio Cultural do Brasil, representa um dos maiores símbolos de valor agregado da agricultura familiar no semiárido piauiense.',
    equipamentos: [
      'Prensa manual ou mecânica',
      'Tachos de aço inoxidável',
      'Filtro de algodão ou filtro-prensa',
      'Garrafas de vidro com tampa coroa',
      'Termômetro culinário',
      'Tanque de banho-maria com grade',
    ],
    insumos: [
      'Cajus maduros e sadios (preferencialmente cajueiro-anão)',
      'Gelatina alimentícia sem sabor (2,5g por litro de suco)',
      'Solução clorada (50ppm) para desinfecção',
    ],
    rendimento: {
      materiaPrima: '10 kg de pedúnculo fresco e limpo',
      produtoFinal: '~7 litros de cajuína cristalina (aprox. 14 garrafas de 500ml)',
      taxaAproveitamento: 'Aproveitamento de 70% do líquido original do pedúnculo',
      subprodutosSecundarios: [
        '2,5 kg de bagaço prensado (destinado à fibra vegetal ou ração animal)',
        'Flocos de tanino decantados',
      ],
    },
    passos: [
      {
        ordem: 1,
        titulo: 'Seleção, Lavagem e Sanitização',
        descricao:
          'Selecione apenas pedúnculos maduros, sem rachaduras ou mofo. Lave em água corrente e faça a imersão em água clorada (50ppm) por 15 minutos para eliminação de microrganismos da casca.',
        dica: 'Evite cajus sobremaduros com fermentação espontânea, pois alteram o pH e a transparência da bebida.',
      },
      {
        ordem: 2,
        titulo: 'Extração Suave do Suco',
        descricao:
          'Retire a castanha torcendo-a levemente. Prense os pedúnculos em prensa mecânica ou manual para extrair o suco integral sem esmagar excessivamente as fibras duras.',
        dica: 'Não adicione água na extração; a autêntica cajuína é feita 100% com o mosto puro do pedúnculo.',
      },
      {
        ordem: 3,
        titulo: 'Clarificação e Desadstringência',
        descricao:
          'Dissolva a gelatina sem sabor em água morna (proporção de 2,5g/litro de suco). Adicione ao suco em temperatura ambiente mexendo suavemente. A gelatina atrai e precipita os taninos responsáveis pela adstringência ("trava" na boca).',
        dica: 'Deixe repousar por 30 a 45 minutos até que uma camada escura de borra se acumule no fundo do recipiente.',
      },
      {
        ordem: 4,
        titulo: 'Filtração por Gravidade',
        descricao:
          'Passe o suco clarificado por coadores de algodão cru ou feltro sintético especial. O líquido deve escorrer por gravidade, sem pressão manual, até adquirir coloração amarelo-palha translúcida.',
        dica: 'A primeira porção que sair turva deve ser devolvida ao topo do filtro até o fluxo clarear por completo.',
      },
      {
        ordem: 5,
        titulo: 'Envase e Caramelização em Banho-Maria',
        descricao:
          'Envase em garrafas de vidro previamente esterilizadas, deixando 3 cm de espaço livre no gargalo. Tampe hermeticamente com tampas coroa e cozinhe em banho-maria mantendo água em ebulição (100°C) por 60 a 90 minutos.',
        dica: 'O calor do banho-maria promove a reação de caramelização dos açúcares naturais do caju, gerando a coloração âmbar sem adição de corantes.',
      },
    ],
    boasPraticas: [
      'Higienizar rigorosamente mãos, utensílios e garrafas com água fervente antes do envase.',
      'Controlar o tempo de banho-maria: menos de 60 minutos pode deixar a bebida vulnerável a fermentações; mais de 100 minutos pode amargar o sabor.',
      'Deixar as garrafas esfriarem gradualmente dentro da própria água do banho-maria para evitar choque térmico e quebra do vidro.',
      'Armazenar em local seco, fresco e protegido da luz solar direta.',
    ],
    avisosSeguranca: [
      'Cuidado ao manusear garrafas quentes no banho-maria: utilize luvas térmicas e pinças adequadas para evitar queimaduras.',
      'Nunca resfrie garrafas quentes sob água corrente fria: risco de explosão por choque térmico.',
    ],
  },
  {
    id: 'castanha',
    title: 'Castanha e LCC',
    tag: 'Alto Valor Agregado',
    icon: 'disc',
    materiaPrimaPrincipal: 'Castanha (Fruto Verdadeiro)',
    tempoMedio: '1 a 2 dias (incluindo secagem e estufagem)',
    dificuldade: 'Avançada',
    descricao:
      'A castanha é o fruto verdadeiro do cajueiro e o produto de maior valor no mercado internacional. Seu beneficiamento produz a amêndoa comestível nobre e o Líquido da Casca da Castanha (LCC), matéria-prima estratégica para resinas industriais, tintas navais e fármacos.',
    equipamentos: [
      'Estufa de secagem com controle de temperatura',
      'Autoclave ou caldeira de vaporização',
      'Máquina decorticadora (manual ou semiautomática)',
      'Mesas de inox para despeliculagem e seleção',
      'Seladora a vácuo com injeção de gás inerte',
    ],
    insumos: [
      'Castanhas cruas limpas e com umidade controlada (~8%)',
      'Embalagens plásticas aluminizadas de alta barreira',
      'Equipamentos de Proteção Individual (EPIs): luvas de nitrila e avental',
    ],
    rendimento: {
      materiaPrima: '10 kg de castanha in natura recém-colhida',
      produtoFinal: '2,2 kg a 2,5 kg de amêndoas inteiras comerciais (W1 a W240)',
      taxaAproveitamento: 'Rendimento de 22% a 25% em amêndoa limpa',
      subprodutosSecundarios: [
        '1,5 kg de Líquido da Casca da Castanha (LCC de alto valor químico)',
        '6,0 kg de cascas residuais (excelente combustível para caldeiras industriais)',
      ],
    },
    passos: [
      {
        ordem: 1,
        titulo: 'Limpeza, Calibragem e Secagem Solar',
        descricao:
          'Espalhe as castanhas recém-desprendidas do pedúnculo em terreiros limpos sob sol por 2 a 3 dias até atingir umidade em torno de 8%. Elimine impurezas e faça a separação por diâmetro.',
        dica: 'O teste prático consiste em sacudir um punhado: a amêndoa seca chocalha suavemente dentro da casca.',
      },
      {
        ordem: 2,
        titulo: 'Umidificação e Tratamento Térmico (Autoclavagem)',
        descricao:
          'Submeta as castanhas a vapor saturado em autoclave ou banho de óleo aquecido por 20 a 30 minutos. O vapor flexibiliza a casca e expande a amêndoa, evitando que ela quebre durante o corte.',
        dica: 'O choque térmico correto garante que o LCC permaneça contido na casca esponjosa sem contaminar o sabor da amêndoa.',
      },
      {
        ordem: 3,
        titulo: 'Decorticação (Corte da Casca)',
        descricao:
          'Com auxílio da decorticadora manual de facas circulares, realize a fenda na casca externa e extraia a amêndoa inteira preservando seu formato anatômico original.',
        dica: 'Amêndoas inteiras (tipo White Wholes) alcançam o dobro do preço de mercado em comparação a pedaços quebrados.',
      },
      {
        ordem: 4,
        titulo: 'Estufagem e Despeliculagem',
        descricao:
          'Leve as amêndoas à estufa a 65°C-70°C por 6 a 8 horas. Esse processo desidrata a película avermelhada exterior, permitindo que ela se solte facilmente por atrito manual suave.',
        dica: 'Utilize luvas descartáveis limpas para não transferir gordura corporal ou resíduos para a castanha limpa.',
      },
      {
        ordem: 5,
        titulo: 'Classificação, Torrefação e Embalagem a Vácuo',
        descricao:
          'Classifique as amêndoas por padrão de qualidade (inteiras, pedaços, grânulos). Realize a torrefação com ou sem sal e embale a vácuo para evitar a rancificação oxidativa das gorduras insaturadas.',
        dica: 'A embalagem hermética a vácuo estende a validade da castanha de 3 meses para até 18 meses com sabor intacto.',
      },
    ],
    boasPraticas: [
      'Garantir isolamento do setor de corte para evitar qualquer respingo de LCC nas mesas de seleção.',
      'Controlar rigorosamente a umidade final abaixo de 4% para evitar proliferação de fungos e toxinas (aflatoxina).',
      'Manter registros de rastreabilidade de lote e data de colheita.',
    ],
    avisosSeguranca: [
      'ALERTA CRÍTICO: O Líquido da Casca (LCC) contém anacárdico e cardol, altamente irritantes e cáusticos. É obrigatório o uso de luvas de borracha nitrílica, máscara de proteção facial e avental impermeável no setor de corte e torra.',
    ],
  },
  {
    id: 'doces',
    title: 'Doces, Polpas e Compotas',
    tag: 'Agricultura Familiar',
    icon: 'sun',
    materiaPrimaPrincipal: 'Pedúnculo (Falso Fruto)',
    tempoMedio: '2 a 3 horas de preparo',
    dificuldade: 'Fácil',
    descricao:
      'Transformação tradicional do pedúnculo em doces cristalizados, compotas em calda e polpa pura pasteurizada para sucos. Permite conservar a safra por mais de um ano, gerando renda constante para associações comunitárias e pequenos produtores.',
    equipamentos: [
      'Tachos abertos de aço inoxidável ou cobre polido',
      'Despolpadeira mecânica de frutas ou liquidificador industrial',
      'Refratômetro óptico (para medição de ºBrix)',
      'Espátulas longas de polietileno resistente ao calor',
      'Potes de vidro tipo conserva com tampa metálica twist-off',
    ],
    insumos: [
      'Pedúnculos de caju maduros e firmes',
      'Açúcar cristal ou demerara de boa qualidade',
      'Ácido cítrico ou suco de limão (regulador de acidez natural)',
      'Especiarias opcionais (cravo-da-índia e canela em casca)',
    ],
    rendimento: {
      materiaPrima: '10 kg de pedúnculo fresco e desengaçado',
      produtoFinal: '6,5 kg de doce em calda ou 8,0 kg de polpa integral pasteurizada',
      taxaAproveitamento: 'Aproveitamento de 80% do peso do pedúnculo',
      subprodutosSecundarios: [
        '1,5 kg de bagaço fibroso filtrado',
        'Calda aromática aproveitável para refrescos ou licores artesanais',
      ],
    },
    passos: [
      {
        ordem: 1,
        titulo: 'Preparo e Furação do Pedúnculo',
        descricao:
          'Lave os cajus e retire os resíduos de engaço. Para doces em calda, fure delicadamente os pedúnculos com garfos de inox e esprema de leve para escoar metade do suco adstringente.',
        dica: 'O suco escorrido nessa fase não deve ser jogado fora: utilize-o para preparar vinagre de caju ou refrescos.',
      },
      {
        ordem: 2,
        titulo: 'Branqueamento Térmico',
        descricao:
          'Mergulhe os pedúnculos em água fervente por 3 a 5 minutos e resfrie em seguida. Esse choque térmico inativa enzimas que escurecem o doce e amacia a casca exterior.',
        dica: 'O branqueamento ajuda a fixar a cor dourada vibrante do caju durante a cocção.',
      },
      {
        ordem: 3,
        titulo: 'Preparo da Calda e Cocção Lenta',
        descricao:
          'Em um tacho, prepare a calda com 400g de açúcar por kg de caju furado. Adicione os cajus e cozinhe em fogo brando, mexendo suavemente até que fiquem translúcidos e a calda atinja ponto de fio (cerca de 55° a 60° Brix).',
        dica: 'Adicione 3 cravos e 1 pau de canela a cada 5 kg para um toque aromático característico da tradição rural.',
      },
      {
        ordem: 4,
        titulo: 'Envase a Quente e Vácuo Espontâneo',
        descricao:
          'Transfira os cajus e a calda ainda ferventes (> 85°C) para potes de vidro esterilizados, deixando 1 cm de borda. Limpe os bocais, tampe bem e vire os potes com a tampa para baixo por 10 minutos.',
        dica: 'A inversão do pote esteriliza a parte interna da tampa pelo calor residual e gera vácuo automático após o resfriamento.',
      },
    ],
    boasPraticas: [
      'Garantir concentração de açúcar correta: pouca calda reduz a vida útil; excesso de açúcar cristaliza no pote.',
      'Checar o fechamento das tampas: ao pressionar o centro da tampa fria, ela não deve emitir som de estalo (indicador de vácuo perfeito).',
      'Rotular com clareza a data de fabricação e validade recomendada (até 12 meses fechado).',
    ],
    avisosSeguranca: [
      'Manuseio de tachos e calda fervente: risco de queimaduras graves por açúcar em alta temperatura. Utilize aventais térmicos e sapatos fechados antiderrapantes.',
    ],
  },
  {
    id: 'fibra',
    title: 'Fibra de Caju (Carne Vegetal)',
    tag: 'Inovação e Zero Desperdício',
    icon: 'layers',
    materiaPrimaPrincipal: 'Pedúnculo e Bagaço',
    tempoMedio: '1 hora de preparo e prensagem',
    dificuldade: 'Fácil',
    descricao:
      'Solução agroecológica e nutricional revolucionária: transforma o bagaço residual da extração de suco e cajuína em carne vegetal texturizada. Rica em fibras alimentares, zero colesterol e com sabor neutro, aceita perfeitamente temperos regionais em hambúrgueres, almôndegas e recheios.',
    equipamentos: [
      'Prensa hidráulica ou prensa tipo fuso',
      'Desfiador ou moedor mecânico de alimentos',
      'Escorredores e peneiras de malha fina de aço inox',
      'Seladora de bandejas ou embaladora a vácuo para congelamento',
    ],
    insumos: [
      'Bagaço fresco resultante da prensagem de caju maduro',
      'Água tratada e limpa para sucessivas lavagens',
      'Temperos regionais (alho, cebola, urucum/colorau, cominho, cheiro-verde)',
      'Farinha de mandioca ou aveia (para dar liga no molde)',
    ],
    rendimento: {
      materiaPrima: '5 kg de bagaço úmido residual de suco',
      produtoFinal: '4,2 kg de fibra desodorizada pronta para tempero e preparo',
      taxaAproveitamento: 'Elimina 100% do descarte de bagaço, transformando-o em alimento nobre',
      subprodutosSecundarios: [
        'Água de enxágue nutritiva (pode ser reutilizada para compostagem e biofertilizante)',
      ],
    },
    passos: [
      {
        ordem: 1,
        titulo: 'Lavagem e Neutralização do Sabor',
        descricao:
          'Coloque o bagaço fresco em um tacho e lave com água corrente abundante por 3 a 4 vezes, espremendo bem entre cada enxágue. Essa lavagem elimina a acidez residual e o cheiro doce de suco.',
        dica: 'O ponto ideal é alcançado quando a água de descarte sai límpida e a fibra perde quase todo o aroma frutado.',
      },
      {
        ordem: 2,
        titulo: 'Prensagem a Seco',
        descricao:
          'Transfira a fibra enxaguada para a prensa e aplique pressão progressiva até retirar o máximo possível de água retida. A massa deve ficar com aspecto solto, granulado e desfiado.',
        dica: 'Quanto mais seca a fibra ficar na prensagem, mais textura e absorção de tempero ela terá no refogado.',
      },
      {
        ordem: 3,
        titulo: 'Refoga e Temperamento Aromático',
        descricao:
          'Em uma panela grande com azeite ou óleo de milho, refogue alho, cebola e urucum. Acrescente a fibra de caju prensada e cozinhe por 10 a 15 minutos adicionando cominho, sal e cheiro-verde picado.',
        dica: 'A fibra de caju tem grande afinidade com temperos nordestinos; o urucum dá uma coloração avermelhada idêntica à carne bovina.',
      },
      {
        ordem: 4,
        titulo: 'Moldagem e Congelamento',
        descricao:
          'Para produção de hambúrgueres vegetais, adicione 2 colheres de farinha de aveia ou fécula de mandioca para ligar a massa. Molde nos formatos desejados e embale para congelamento a -18°C.',
        dica: 'Pode ser comercializado fresco para consumo em até 3 dias ou congelado com validade de até 6 meses.',
      },
    ],
    boasPraticas: [
      'Processar o bagaço no mesmo dia da extração do suco para evitar o início de fermentações e odores azedos.',
      'Manter a bancada de lavagem e prensas rigorosamente limpas e higienizadas com solução sanitizante.',
      'Conservar o produto final sempre sob refrigeração (< 4°C) ou congelamento (< -18°C).',
    ],
    avisosSeguranca: [
      'Cuidado ao manusear as prensas mecânicas: certifique-se de manter as mãos longe dos pistões de compressão durante o acionamento.',
    ],
  },
];

export class DerivadosService {
  /**
   * Retorna os detalhes de um derivado a partir do seu identificador.
   */
  getDerivadoById(id: string): DerivadoDetail | undefined {
    if (!id) return undefined;
    const cleanId = id.trim().toLowerCase();
    return DERIVADOS_DATA.find((item) => item.id === cleanId);
  }

  /**
   * Retorna a lista completa de derivados disponíveis no catálogo.
   */
  getAllDerivados(): DerivadoDetail[] {
    return DERIVADOS_DATA;
  }
}

export const derivadosService = new DerivadosService();
