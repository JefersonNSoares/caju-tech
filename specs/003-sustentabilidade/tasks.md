# Implementation Tasks: Módulo de Sustentabilidade e Inovação

**Feature**: Sustentabilidade e Inovação  
**Branch**: `003-sustentabilidade`

## Phase 1: Setup

- [x] T001 Criar estrutura do plano de implementação e especificações na pasta `specs/003-sustentabilidade`

## Phase 2: Foundational

- [x] T002 [P] Definir tipos TypeScript para o módulo em `types/sustentabilidade.ts` baseado no data-model
- [x] T003 [P] Criar serviço de dados estáticos em `services/sustentabilidadeService.ts` contendo as 4 categorias completas (Resíduos, Bioprodutos, Boas Práticas, Renda)

## Phase 3: User Story 1 - Acesso à Listagem de Práticas Sustentáveis (P1)

**Goal**: Visualizar os diferentes cartões de práticas e inovações.
**Independent Test**: Clicar na aba "Sustentabilidade" e verificar se a listagem exibe 4 cards corretos.

- [x] T004 [US1] Criar e estilizar a página principal em `app/(tabs)/sustentabilidade/index.tsx` com lista de cartões acessíveis

## Phase 4: User Story 2 - Detalhamento das Práticas Sustentáveis (P2)

**Goal**: Ver detalhes técnicos, etapas e impactos de uma prática específica.
**Independent Test**: Navegar para `/sustentabilidade/[id]` e verificar conteúdo carregado offline.

- [x] T005 [US2] Criar a estrutura base da rota dinâmica em `app/(tabs)/sustentabilidade/[id].tsx`
- [x] T006 [P] [US2] Integrar `sustentabilidadeService.ts` e implementar `EmptyState` na rota caso o id não seja localizado
- [x] T007 [P] [US2] Renderizar o conteúdo detalhado, etapas e dicas práticas usando o componente `Card` em `app/(tabs)/sustentabilidade/[id].tsx`

## Phase 5: Polish & Cross-Cutting Concerns

- [x] T008 Validar uso de hitbox mínima de 48x48dp e acessibilidade (labels) em toda a tela de detalhes
- [x] T009 Testar tempo de carregamento offline (<300ms) executando o build web ou app emulador

## Dependencies

- Phase 2 (Fundação de dados) deve ser concluída antes da Phase 4 (US2).
- T005, T006 e T007 dependem de T002 e T003 para os dados tipados.
- US1 já se encontra parcialmente testável, garantindo fluxo de navegação imediato.

## Implementation Strategy

Como a listagem (US1) foi antecipada na construção, a prioridade absoluta agora é fornecer os dados subjacentes estáticos (Phase 2) e construir a tela de detalhes (Phase 4). A abordagem será mock-first (implementar os dados de uma vez) para habilitar o desenvolvimento paralelo do UI da tela de detalhes.
