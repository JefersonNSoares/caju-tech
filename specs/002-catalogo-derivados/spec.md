# Feature Specification: Catálogo de Derivados e Aproveitamento Integral do Caju

**Feature Branch**: `002-catalogo-derivados`  
**Created**: 2026-09-24  
**Status**: Draft  
**Input**: Especificar o Catálogo de Derivados e Aproveitamento Integral do Caju ([id].tsx)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consulta Detalhada do Derivado com Guia de Processamento (Priority: P1)

Como agricultor familiar ou extensionista rural, eu quero selecionar um derivado do caju (ex.: Cajuína, Castanha, Doces, Fibra) na listagem e acessar uma tela de detalhe completa (`[id].tsx`), para que eu conheça os requisitos, ingredientes, equipamentos necessários e o fluxo sequencial de beneficiamento.

**Why this priority**: É o núcleo funcional da tela `[id].tsx`. Sem a visualização dos dados técnicos e etapas de produção de cada derivado, o catálogo permanece apenas como um menu estático sem valor educativo ou prático.

**Independent Test**: Clicar em qualquer card de derivado na tela principal de derivados e validar que a rota `/derivados/[id]` é aberta exibindo o título correto, tag de valor agregado, insumos/equipamentos e as etapas ordenadas de produção.

**Acceptance Scenarios**:

1. **Given** que o usuário está na tela de listagem de derivados, **When** ele toca no card "Cajuína Tradicional Piauiense", **Then** a aplicação navega para `/derivados/cajuina` exibindo histórico cultural, equipamentos (prensa, tachos, garrafas), agente clarificante (gelatina) e as etapas de decantação, filtragem e banho-maria.
2. **Given** que o usuário está na tela de detalhe de um derivado, **When** ele interage com qualquer botão ou elemento de navegação de retorno, **Then** a ação é acionada imediatamente através de botões com hitbox mínima de 48x48dp.
3. **Given** um identificador de derivado inexistente na URL, **When** a rota dinâmica `[id].tsx` é carregada, **Then** o sistema exibe o componente de estado vazio (`EmptyState`) em linguagem rural amigável orientando o retorno ao catálogo.

---

### User Story 2 - Métricas de Rendimento e Aproveitamento Integral do Fruto (Priority: P2)

Como produtor rural ou empreendedor comunitário, eu quero visualizar estimativas de rendimento e potencial de agregação de valor (ex.: "A cada 10kg de pedúnculo obtém-se ~7L de suco para cajuína + 2,5kg de bagaço para fibra vegetal"), para que eu tome decisões conscientes sobre como evitar o desperdício do pedúnculo após a colheita da castanha.

**Why this priority**: O desperdício de mais de 80% do pedúnculo é a principal dor econômica da cajucultura no semiárido. Fornecer dados claros de rendimento estimula a agroindústria comunitária e justifica o esforço de processamento.

**Independent Test**: Validar que na tela de detalhe de cada derivado existe um card de destaque de "Aproveitamento e Rendimento" exibindo a taxa de conversão e a matéria-prima aproveitada (pedúnculo, amêndoa, LCC ou bagaço).

**Acceptance Scenarios**:

1. **Given** a visualização de um derivado baseado em pedúnculo (ex.: Cajuína ou Fibra de Caju), **When** a seção de rendimento é apresentada, **Then** são exibidas a proporção estimada de matéria-prima necessária, a taxa de perda/aproveitamento e o subproduto secundário gerado.
2. **Given** a visualização de derivados de castanha, **When** a seção de rendimento é apresentada, **Then** o sistema detalha o aproveitamento da amêndoa (W1 a W4) e o valor residual da casca/LCC.

---

### User Story 3 - Roteiro de Boas Práticas e Higiene Rural (Priority: P3)

Como estudante técnico ou manipulador de alimentos, eu quero consultar alertas de segurança alimentar e boas práticas de higiene específicas para cada derivado (sanitização do caju, temperatura de pasteurização, cuidados no corte da castanha com LCC), para assegurar a conservação do produto e a saúde do consumidor.

**Why this priority**: A conformidade sanitária e a segurança do operador (especialmente no manuseio do LCC cáustico ou no tratamento térmico de doces e cajuína) são indispensáveis para comercialização legal e consumo seguro.

**Independent Test**: Verificar a presença da seção de "Avisos e Boas Práticas" no final da tela de detalhe, destacando pontos de atenção críticos com iconografia de alerta acessível.

**Acceptance Scenarios**:

1. **Given** a tela de detalhes da Cajuína ou Doces, **When** o usuário rola até as boas práticas, **Then** são exibidas orientações claras sobre esterilização das embalagens e teste de vedação das tampas.
2. **Given** a tela de detalhes da Castanha, **When** o usuário consulta a segurança, **Then** é enfatizado o uso de EPIs contra os vapores e o efeito cáustico do líquido da casca.

---

### Edge Cases

- **Identificador inválido ou não cadastrado na rota dinâmica**: Se o parâmetro `[id]` na URL não corresponder a nenhum item do catálogo cadastrado, a aplicação deve renderizar um `EmptyState` com mensagem rural explicativa ("Derivado não encontrado na nossa cesta") e um botão claro de 48x48dp para retornar à listagem.
- **Uso sem conexão com a internet**: Todos os dados e etapas dos derivados devem estar disponíveis localmente na aplicação, garantindo funcionamento ininterrupto mesmo em áreas isoladas da zona rural.
- **Telas com densidade de texto alta em telas pequenas**: Em aparelhos de tela compacta (comuns entre trabalhadores rurais), os textos das etapas e tabelas de rendimento devem manter tipografia legível (mínimo 14sp), quebra fluida de linha e rolagem suave sem corte horizontal.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST implementar a rota dinâmica `app/(tabs)/derivados/[id].tsx` no Expo Router, conectada à lista do catálogo `app/(tabs)/derivados/index.tsx`.
- **FR-002**: O sistema MUST disponibilizar os dados estruturados de pelo menos quatro categorias principais de derivados: Castanha/LCC, Cajuína Tradicional, Doces/Polpas e Fibra de Caju (Carne Vegetal).
- **FR-003**: A tela `[id].tsx` MUST exibir as seções: Cabeçalho com Nome e Badge de Valor Agregado, Descrição Geral, Matéria-Prima & Equipamentos, Etapas de Processamento Sequenciais, Indicadores de Rendimento e Boas Práticas Sanitárias.
- **FR-004**: Cada etapa de processamento MUST conter um número de ordem visual, título direto, descrição em linguagem acessível e observação prática de campo.
- **FR-005**: Todos os elementos interativos (botão de retorno, links e cards clicáveis) MUST atender à regra constitucional de hitbox mínima de **48x48dp**.
- **FR-006**: O sistema MUST respeitar a regra "Zero Telas em Branco" (TEL-EST-01), com carregamento instantâneo a partir da base local de dados, estado vazio para rotas não mapeadas e suporte ao banner de status offline.
- **FR-007**: A tela `[id].tsx` MUST ser 100% responsiva, adaptando-se tanto a telas verticais de smartphones Android quanto a painéis largos no React Native for Web (largura máxima centralizada de 800px).
- **FR-008**: O sistema MUST manter consistência terminológica rigorosa com as diretrizes do CajuTech (`Cultivo`, `Derivados`, `Sustentabilidade`, `Recursos`).

### Key Entities

- **DerivadoItem**: Representa o registro completo de um produto derivado, contendo identificador único (`id`), nome comercial (`title`), categoria/badge (`tag`), resumo introdutório (`description`), ícone temático (`icon`), tempo médio de preparo (`tempoMedio`) e complexidade (`dificuldade`).
- **EtapaProcessamento**: Representa uma fase sequencial do beneficiamento do produto, contendo número da ordem (`passo`), título da ação (`titulo`), instruções detalhadas (`descricao`) e recomendação técnica (`dica`).
- **MétricaRendimento**: Representa as razões de conversão e aproveitamento do fruto, incluindo entrada necessária (`materiaPrima`), volume produzido (`produtoFinal`) e subprodutos aproveitáveis (`aproveitamentoSecundario`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A partir do toque no card da listagem de derivados, a tela de detalhes `[id].tsx` deve ser renderizada e legível em menos de **300ms** no mobile e na web.
- **SC-002**: 100% dos botões, ícones clicáveis e alvos de toque na tela de detalhes devem respeitar a dimensão mínima de **48x48dp**.
- **SC-003**: 100% das informações técnicas, receitas e etapas devem funcionar sem dependência de conexão de internet, mantendo utilidade plena em áreas remotas.
- **SC-004**: A navegação entre o catálogo e o detalhe do derivado deve respeitar a Regra dos 2 Toques, permitindo ao usuário chegar ao processo completo a partir da tela inicial em 2 toques.

## Accessibility & Consistency (Constitution)

- **Terminology**: Termos padronizados com o projeto: `Derivados`, `Aproveitamento Integral`, `Pedúnculo`, `Castanha`, `Semiárido`.
- **UI Targets**: Hitbox mínima obrigatória de **48x48dp** em qualquer elemento interativo.
- **Async States**: Suporte imediato aos estados Carregando, Vazio (id inexistente) e Offline.
- **Layout Responsivo**: Contêiner centralizado com `maxWidth: 800` para desktop web e margens acessíveis para Android.

## Assumptions

- Os dados detalhados dos derivados são providos via catálogo local estático/tipado em TypeScript, garantindo disponibilidade offline sem necessidade imediata de backend externo.
- As quatro receitas/processos cobrem os produtos de maior relevância econômica e cultural do Piauí e do semiárido nordestino (Castanha, Cajuína, Doces e Fibra).
- Os tempos e rendimentos representam médias agroindustriais e de agricultura familiar recomendadas por pesquisas agronômicas (Embrapa Agroindústria Tropical).
