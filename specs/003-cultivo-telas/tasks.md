# Tasks: Sub-telas de Cultivo e Ajuste de Layout

**Input**: Design documents from `specs/003-cultivo-telas/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`  
**Branch**: `feat/003-cultivo-telas`

## Phase 1: Setup

- [x] T001 Definir tipos TypeScript para as fases de cultivo e vídeos em `types/cultivo.ts`

---

## Phase 2: Foundational

- [x] T002 [P] Implementar serviço de dados estáticos offline com as 4 etapas e 2 vídeos por etapa em `services/cultivoService.ts`
- [x] T003 [P] Criar componente visual de placeholder de vídeo (`VideoCardPlaceholder`) com aspecto 16:9, capa e botão de play em `components/media/VideoCardPlaceholder.tsx`
- [x] T004 [P] Criar componente modal do player de vídeo ampliado (`VideoPlayerModal`) com descrição/resumo completo e botão de fechar acessível em `components/media/VideoPlayerModal.tsx`
- [x] T005 Registrar as 4 novas sub-telas de cultivo (`plantio`, `irrigacao`, `poda`, `pragas`) com `options={{ href: null }}` em `app/(tabs)/_layout.tsx`

---

## Phase 3: User Story 1 - Layout Vertical e Navegação da Tela Principal de Cultivo (P1) 🎯 MVP

**Goal**: Alinhar verticalmente os 4 botões de navegação do módulo ocupando a largura adequada da tela, com suporte responsivo para celular e PC via NativeWind e redirecionamento para cada sub-tela.  
**Independent Test**: Acessar `app/(tabs)/cultivo/index.tsx`, verificar os cards em coluna única com largura responsiva e acionar cada botão para navegar para a sub-rota correspondente.

- [x] T006 [US1] Refatorar layout para disposição vertical responsiva (NativeWind) e vincular as rotas de navegação nos botões em `app/(tabs)/cultivo/index.tsx`

---

## Phase 4: User Story 2 & 3 - Criação das 4 Sub-telas de Cultivo e Exibição de Vídeos (P1 & P2)

**Goal**: Criar as 4 rotas de conteúdo agronômico com cabeçalho de voltar, textos explicativos no topo, área para 2 vídeos e acionamento do player modal com resumo.  
**Independent Test**: Navegar em cada sub-tela, validar o botão de retorno, a presença das orientações agronômicas, a renderização dos 2 cards de vídeo e a abertura do player modal com o resumo técnico completo ao clicar no placeholder.

- [x] T007 [P] [US2] Implementar sub-tela de Plantio e Espaçamento com textos técnicos e 2 vídeos em `app/(tabs)/cultivo/plantio.tsx`
- [x] T008 [P] [US2] Implementar sub-tela de Irrigação e Recursos Hídricos com textos técnicos e 2 vídeos em `app/(tabs)/cultivo/irrigacao.tsx`
- [x] T009 [P] [US2] Implementar sub-tela de Poda e Adubação com textos técnicos e 2 vídeos em `app/(tabs)/cultivo/poda.tsx`
- [x] T010 [P] [US2] Implementar sub-tela de Controle de Pragas e Doenças com textos técnicos e 2 vídeos em `app/(tabs)/cultivo/pragas.tsx`

---

## Phase 5: Polish & Cross-Cutting Concerns

- [x] T011 Validar hitboxes mínimas de 48x48dp e acessibilidade (labels e accessibilityRole) em todos os botões e cards interativos
- [x] T012 Executar validação de tipos TypeScript (`npm run typecheck`) e certificar funcionamento limpo no mobile e desktop web

---

## Dependencies & Execution Order

- **Phase 1 (Setup)** e **Phase 2 (Foundational)** concluídas com tipos, dados (`cultivoService`) e os componentes reutilizáveis (`VideoCardPlaceholder` e `VideoPlayerModal`).
- **Phase 3 (US1)** conecta a tela principal às novas rotas.
- **Phase 4 (US2 & US3)** implementa as 4 sub-telas aproveitando a arquitetura componentizada.
- **Phase 5 (Polish)** garante conformidade com as regras da Constituição do projeto.
