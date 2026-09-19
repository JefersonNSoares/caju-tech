# Tasks: CajuTech Universal App Setup

**Input**: Design documents from `specs/001-app-setup/` (`spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`)  
**Prerequisites**: `plan.md` (required), `spec.md` (required for user stories), `research.md`, `data-model.md`, `contracts/`

**Tests**: Testes automatizados adicionais são opcionais nesta fase de setup. A validação é realizada via `npx tsc --noEmit` e execução multiplataforma (`npx expo start --web` e `npx expo start --android`).

**Organization**: Tarefas organizadas por user story para assegurar implementação e validação independentes.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Pode rodar em paralelo (arquivos distintos, sem dependências pendentes)
- **[Story]**: User story correspondente (`[US1]`, `[US2]`, `[US3]`)
- Caminhos absolutos/relativos exatos incluídos nas descrições

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicialização do ecossistema Expo, configurações universais e dependências principais.

- [x] T001 Initialize Expo project configuration and root files in package.json, app.json, babel.config.js, and metro.config.js
- [x] T002 Install core dependencies (expo, expo-router, react-native-web, react-dom, nativewind, tailwindcss, @expo/vector-icons, @react-native-community/netinfo, @react-native-async-storage/async-storage) in package.json
- [x] T003 [P] Configure Tailwind and NativeWind CSS styles in tailwind.config.js and global.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestrutura compartilhada de tipos, tokens de tema e hook de conectividade que BLOQUEIA todas as user stories.

**⚠️ CRITICAL**: Nenhuma user story deve ser iniciada antes da conclusão desta fase.

- [x] T004 [P] Configure strict TypeScript configuration in tsconfig.json
- [x] T005 [P] Define theme and rural design token types in types/theme.ts
- [x] T006 [P] Define network connectivity types in types/network.ts
- [x] T007 [P] Define universal async feedback state types (4 states) in types/state.ts
- [x] T008 [P] Define navigation and user profile types in types/navigation.ts and types/user.ts
- [x] T009 Implement centralized theme tokens and rural color palette constants in constants/theme.ts
- [x] T010 Implement universal network connectivity hook in hooks/useNetworkStatus.ts

**Checkpoint**: Base foundational pronta — a implementação das user stories pode começar em paralelo.

---

## Phase 3: User Story 1 - Multiplatform Development Setup (Priority: P1) 🎯 MVP

**Goal**: Unificar a base de código universal para Android e Web através do Expo Router com roteamento baseado em arquivos para `(auth)` e `(tabs)`.

**Independent Test**: Executar `npx expo start --web` e `npx expo start --android`, verificando a renderização correta das abas principais e rotas iniciais sem erros.

### Implementation for User Story 1

- [x] T011 [US1] Implement root layout with SafeArea and global context providers in app/_layout.tsx
- [x] T012 [P] [US1] Implement universal 5-tab navigation layout in app/(tabs)/_layout.tsx
- [x] T013 [P] [US1] Implement Home dashboard screen in app/(tabs)/index.tsx
- [x] T014 [P] [US1] Implement Cultivo module overview screen in app/(tabs)/cultivo/index.tsx
- [x] T015 [P] [US1] Implement Derivados module overview screen in app/(tabs)/derivados/index.tsx
- [x] T016 [P] [US1] Implement Sustentabilidade module overview screen in app/(tabs)/sustentabilidade/index.tsx
- [x] T017 [P] [US1] Implement Recursos module overview screen in app/(tabs)/recursos/index.tsx
- [x] T018 [P] [US1] Implement authentication stack layout in app/(auth)/_layout.tsx
- [x] T019 [P] [US1] Implement fast startup splash screen (< 3s) in app/(auth)/splash.tsx
- [x] T020 [P] [US1] Implement user profile selection login screen in app/(auth)/login.tsx

**Checkpoint**: Neste ponto, a User Story 1 (MVP) estará plenamente funcional e navegável na Web e no Android.

---

## Phase 4: User Story 2 - Strict Type Safety & Tooling (Priority: P2)

**Goal**: Garantir 100% de segurança de tipos com TypeScript estrito, scripts de verificação e ambiente de compilação sem warnings.

**Independent Test**: Executar `npx tsc --noEmit` na raiz do projeto e validar que a saída é livre de erros.

### Implementation for User Story 2

- [x] T021 [US2] Add npm scripts for typecheck (tsc --noEmit), web start, and android start in package.json
- [x] T022 [P] [US2] Create ambient module declarations for NativeWind, images, and fonts in types/declarations.d.ts
- [x] T023 [US2] Audit and enforce strict typing across all route components and layout providers in app/

**Checkpoint**: As User Stories 1 e 2 estarão integradas e com tipagem estrita validada.

---

## Phase 5: User Story 3 - Visual Foundation & Rural Accessibility (Priority: P3)

**Goal**: Implementar a fundação de acessibilidade rural (hitbox mínima de 48x48dp) e os 4 componentes de feedback universal (Zero Telas em Branco).

**Independent Test**: Inspecionar elementos interativos confirmando área de clique mínima de 48x48dp; alternar rede/estados simulando Skeleton (< 400ms), EmptyState, OfflineBanner e ErrorCard com retry.

### Implementation for User Story 3

- [x] T024 [P] [US3] Implement AccessiblePressable enforcing minimum 48x48dp hitbox in components/common/AccessiblePressable.tsx
- [x] T025 [US3] Implement accessible Button component with rural palette variants in components/common/Button.tsx
- [x] T026 [P] [US3] Implement accessible Card container component in components/common/Card.tsx
- [x] T027 [P] [US3] Implement Skeleton loader component (< 400ms pulse) in components/feedback/Skeleton.tsx
- [x] T028 [P] [US3] Implement EmptyState component with friendly rural language in components/feedback/EmptyState.tsx
- [x] T029 [P] [US3] Implement OfflineBanner component with connectivity indicator in components/feedback/OfflineBanner.tsx
- [x] T030 [US3] Implement ErrorCard component with isolated retry trigger in components/feedback/ErrorCard.tsx
- [x] T031 [P] [US3] Implement accessible mobile TabBar with 48x48dp touch targets in components/navigation/TabBar.tsx
- [x] T032 [P] [US3] Implement responsive desktop web navigation bar in components/navigation/WebSidebar.tsx

**Checkpoint**: Todas as 3 User Stories estarão concluídas e atendendo integralmente à Constituição do CajuTech.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verificação ponta a ponta, alinhamento com a Constituição e documentação do desenvolvedor.

- [x] T033 [P] Execute end-to-end verification following specs/001-app-setup/quickstart.md
- [x] T034 Audit constitution compliance (hitboxes >= 48dp, 2-touch navigation, rural labels, zero white screens)
- [x] T035 [P] Update README.md with universal development workflow and command reference

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sem dependências — execução imediata.
- **Foundational (Phase 2)**: Depende da Fase 1 — BLOQUEIA as User Stories.
- **User Story 1 (Phase 3)**: Depende da Fase 2 (Foundational).
- **User Story 2 (Phase 4)**: Depende da Fase 2 e validação das rotas da Fase 3.
- **User Story 3 (Phase 5)**: Depende da Fase 2; componentes podem ser desenvolvidos em paralelo e integrados às telas da US1.
- **Polish (Phase 6)**: Depende da conclusão de todas as fases anteriores.

### User Story Dependencies

- **User Story 1 (P1 - MVP)**: Pode iniciar assim que a Fase 2 (Foundational) for concluída. Independente das histórias subsequentes.
- **User Story 2 (P2)**: Depende das rotas criadas na US1 para validação completa com `tsc --noEmit`.
- **User Story 3 (P3)**: Depende dos tokens de tema (Fase 2); enriquece as telas da US1 com acessibilidade estrita e feedback visual.

### Parallel Opportunities

- **Fase 1**: `T003` pode rodar em paralelo com a instalação de pacotes.
- **Fase 2**: `T004`, `T005`, `T006`, `T007` e `T008` definem arquivos de tipos isolados e podem ser implementados simultaneamente em paralelo.
- **Fase 3 (US1)**: As telas de abas (`T013`, `T014`, `T015`, `T016`, `T017`) e telas de autenticação (`T019`, `T020`) são arquivos independentes e podem ser criadas em paralelo.
- **Fase 5 (US3)**: Componentes `T024`, `T026`, `T027`, `T028`, `T029`, `T031`, `T032` operam em arquivos isolados e podem ser construídos em paralelo.

---

## Parallel Example: User Story 1 (Rotas das Abas)

```bash
# Lançar criação simultânea das telas de abas:
Task: "Implement Home dashboard screen in app/(tabs)/index.tsx"
Task: "Implement Cultivo module overview screen in app/(tabs)/cultivo/index.tsx"
Task: "Implement Derivados module overview screen in app/(tabs)/derivados/index.tsx"
Task: "Implement Sustentabilidade module overview screen in app/(tabs)/sustentabilidade/index.tsx"
Task: "Implement Recursos module overview screen in app/(tabs)/recursos/index.tsx"
```

---

## Parallel Example: User Story 3 (Componentes de Feedback)

```bash
# Lançar criação simultânea dos componentes de feedback:
Task: "Implement Skeleton loader component in components/feedback/Skeleton.tsx"
Task: "Implement EmptyState component in components/feedback/EmptyState.tsx"
Task: "Implement OfflineBanner component in components/feedback/OfflineBanner.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Concluir Fase 1 (Setup inicial e dependências)
2. Concluir Fase 2 (Foundational: tipos, constantes de tema e hook de rede)
3. Concluir Fase 3 (User Story 1: layouts e 5 rotas universais)
4. **VALIDAR MVP**: Testar execução local com `npx expo start --web`

### Incremental Delivery

1. Setup + Foundational concluídos → base técnica sólida
2. Adicionar US1 (MVP) → Roteamento universal e navegação funcionando
3. Adicionar US2 → Tipagem estrita TypeScript (`tsc --noEmit` sem erros)
4. Adicionar US3 → Acessibilidade rural garantida (hitboxes >= 48dp) e 4 estados de feedback
5. Polish → Validação final de ponta a ponta e documentação atualizada
