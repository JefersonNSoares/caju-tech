# Feature Specification: Módulo de Sustentabilidade e Inovação

**Feature Branch**: `003-sustentabilidade`  
**Created**: 2026-10-07  
**Status**: Draft  
**Input**: Especificar o módulo de Sustentabilidade e Inovação (index.tsx e rotas dinâmicas de detalhe)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Acesso à Listagem de Práticas Sustentáveis (Priority: P1)

Como extensionista ou produtor, eu quero acessar o módulo de Sustentabilidade para visualizar os diferentes cartões de práticas e inovações (Resíduos, Bioprodutos, Boas Práticas e Renda), para que eu possa explorar soluções de economia circular.

**Why this priority**: É o ponto de entrada principal do módulo.
**Independent Test**: Clicar na aba "Sustentabilidade" e verificar se a listagem exibe 4 cards corretos e se navega para as subpáginas corretamente.

### User Story 2 - Detalhamento das Práticas Sustentáveis (Priority: P2)

Como usuário do aplicativo, eu quero clicar em um card específico (ex: Aproveitamento de Resíduos) e ver detalhes técnicos, etapas e impactos dessa prática, para poder aplicá-los na minha realidade.

**Why this priority**: Fornece o valor educativo prático.
**Independent Test**: Navegar para `/sustentabilidade/[id]` e verificar conteúdo carregado offline.

### User Story 3 - Simulador de Geração de Valor com Resíduos do Caju (TEL-SUST-04) (Priority: P1)

Como agricultor familiar ou estudante, eu quero simular o potencial de ganho financeiro obtido com o aproveitamento da casca da castanha (LCC) e do bagaço do pedúnculo a partir da quantidade colhida/processada, para tangibilizar o valor da economia circular.

**Why this priority**: Conecta sustentabilidade ambiental diretamente à renda e viabilidade econômica do agricultor.
**Independent Test**: Navegar para `/sustentabilidade/simulador`, alternar entre abas "Casca (LCC)" e "Bagaço do Caju", ajustar o slider ou digitar quantidade, verificar atualização instantânea de valores (R$) e navegar para o tutorial correspondente via "Como aproveitar este resíduo".

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST manter a listagem `app/(tabs)/sustentabilidade/index.tsx` já implementada.
- **FR-002**: O sistema MUST implementar a rota dinâmica `app/(tabs)/sustentabilidade/[id].tsx`.
- **FR-003**: Os dados DEVEM ser estáticos e locais (`services/sustentabilidadeService.ts`).
- **FR-004**: O sistema MUST respeitar a regra "Zero Telas em Branco" (TEL-EST-01).
- **FR-005**: Elementos clicáveis MUST ter hitbox de 48x48dp.
- **FR-010**: O sistema MUST recalcular instantaneamente os valores do painel de resultados sempre que o slider for movimentado (latência < 100ms).
- **FR-011**: O sistema MUST aplicar fórmulas de conversão diferentes dependendo da aba selecionada (Casca vs Bagaço).
  - Casca/LCC: 20% de rendimento de LCC a R$ 4,50/litro.
  - Bagaço: 25% de rendimento de bagaço prensado a R$ 0,80/kg.
- **FR-012**: O sistema MUST permitir a digitação manual do valor no campo numérico como alternativa ao uso do slider, rejeitando caracteres não numéricos ou valores negativos, limitado a 100 toneladas (100.000 kg).

### Non-Functional Requirements

- **RNF-05**: O recálculo dos valores na tela deve ocorrer sem atraso perceptível (latência menor que 100ms) para garantir sensação de fluidez na simulação.

### Key Entities

- **PraticaSustentavel**: Identificador, título, tag, descrição, ícone, seções de conteúdo.
- **ParametrosResiduo**: Identificador ('casca' | 'bagaco'), nome, unidade de entrada, unidade de resíduo, taxa de rendimento, preço unitário, rotas de tutoriais.
- **ResultadoSimulacao**: Tipo de resíduo, quantidade de entrada (kg), volume de resíduo gerado, valor estimado em R$, rendimento percentual e cotação de referência.

## Wireframe TEL-SUST-04

```text
+------------------------------------------+
| [<- Voltar]   SIMULADOR DE RENDA         |
+------------------------------------------+
| Qual resíduo você quer aproveitar?       |
|                                          |
| [  Casca (LCC)  ] | [ Bagaço do Caju ]   |
|                                          |
| Informe a quantidade colhida:            |
| (--)================(O)-------(+)        |
|           [ 500 ] kg                     |
|                                          |
| +--------------------------------------+ |
| | VOCÊ PODERIA ESTAR GANHANDO:         | |
| | R$ 450,00 extras                     | |
| | com a venda do LCC extraído.         | |
| +--------------------------------------+ |
|                                          |
| [ BOTÃO: Como aproveitar este resíduo ]  |
+------------------------------------------+
```

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Acesso aos detalhes em menos de 300ms.
- **SC-002**: 100% de disponibilidade offline.
- **SC-003**: Recálculo dos valores do simulador em tempo real (< 100ms).
- **SC-004**: Precisão matemática nas conversões de Casca (1.000 kg -> 200 L -> R$ 900,00) e Bagaço (1.000 kg -> 250 kg -> R$ 200,00).

## Accessibility & Consistency (Constitution)

- **Terminology**: `Economia Circular`, `Inovação Verde`, `Simulador de Renda Sustentável`.
- **UI Targets**: Hitbox mínima de 48x48dp em todos os controles, abas e botões.

