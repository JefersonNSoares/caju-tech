# Tasks: Identificação e Login Local (TEL-LOG-01)

**Input**: Design documents from `/specs/002-local-login/`  
**Prerequisites**: [`plan.md`](plan.md), [`spec.md`](spec.md), [`research.md`](research.md), [`data-model.md`](data-model.md), [`contracts/`](contracts/)  
**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., `[US1]`, `[US2]`, `[US3]`)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Type definitions, constants, and shared storage keys

- [X] T001 Update UserProfile and AuthSession types in types/user.ts
- [X] T002 [P] Create storage key constants in constants/storage.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core storage service and reactive authentication context that MUST be complete before user stories can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Implement IAuthStorageService in services/authStorage.ts using @react-native-async-storage/async-storage
- [X] T004 Implement AuthContext and useAuth hook provider in hooks/useAuth.tsx
- [X] T005 Wire AuthProvider into root layout in app/_layout.tsx

**Checkpoint**: Core authentication foundation and storage layer ready - user story implementation can begin

---

## Phase 3: User Story 1 - Seleção e Confirmação de Perfil Local (Priority: P1) 🎯 MVP

**Goal**: Permitir que o produtor rural, estudante ou visitante selecione seu perfil de atuação (Agricultor, Estudante, Visitante), informe opcionalmente seu nome com sanitização e fallback amigável, grave no armazenamento local e navegue imediatamente para a aplicação.

**Independent Test**: Abrir a tela `/(auth)/login`, selecionar um perfil, preencher o nome (ou deixar em branco para validar o fallback), clicar em "Continuar para a Aplicação" e constatar que a sessão é gravada e a tela navega para `/(tabs)` em menos de 1 segundo.

### Implementation for User Story 1

- [X] T006 [US1] Add display name input with 40-character limit and 48dp minimum touch target in app/(auth)/login.tsx
- [X] T007 [US1] Implement automatic name fallback logic and profile validation in app/(auth)/login.tsx
- [X] T008 [US1] Connect login submission to useAuth().login in app/(auth)/login.tsx
- [X] T009 [US1] Ensure profile cards comply with 48x48dp hitbox and accessibilityRole="radio" in app/(auth)/login.tsx

**Checkpoint**: User Story 1 (MVP) is fully functional and can be tested independently.

---

## Phase 4: User Story 2 - Persistência da Sessão Local e Acesso Rápido (Priority: P2)

**Goal**: Fazer com que o aplicativo valide a existência de uma sessão ativa na Splash Screen e redirecione automaticamente para o painel principal em menos de 2 segundos, sem exigir login a cada inicialização.

**Independent Test**: Fechar e reabrir o app com uma sessão salva; verificar que a tela `app/(auth)/splash.tsx` exibe o indicador suave e direciona direto para `/(tabs)` sem passar pela tela de login.

### Implementation for User Story 2

- [X] T010 [US2] Update app/(auth)/splash.tsx to consume useAuth state (isLoading and isAuthenticated)
- [X] T011 [US2] Implement conditional routing in app/(auth)/splash.tsx to /(tabs) when authenticated and /(auth)/login when unauthenticated
- [X] T012 [US2] Ensure smooth loading indicator and error recovery fallback in app/(auth)/splash.tsx complying with TEL-EST-01

**Checkpoint**: User Stories 1 and 2 work seamlessly together with persistent session lifecycle.

---

## Phase 5: User Story 3 - Alternância e Redefinição de Perfil Local (Priority: P3)

**Goal**: Permitir que o usuário troque de perfil a qualquer momento (sobrescrevendo o perfil ativo no storage) ou execute a ação explícita de "Sair / Redefinir" (limpando o storage e retornando ao login).

**Independent Test**: Na Home ou no cabeçalho, acionar "Trocar Perfil" e verificar retorno ao login com seleção prévia, ou acionar "Sair / Redefinir" e constatar remoção completa dos dados locais e retorno ao login.

### Implementation for User Story 3

- [X] T013 [US3] Add User Profile greeting and profile action buttons in app/(tabs)/index.tsx
- [X] T014 [US3] Implement profile switch action redirecting to app/(auth)/login.tsx in app/(tabs)/index.tsx
- [X] T015 [US3] Connect Sair / Redefinir action to useAuth().logout() in app/(tabs)/index.tsx

**Checkpoint**: All three user stories are completely functional and integrated.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validações estritas de tipagem, acessibilidade rural e testes de regressão

- [X] T016 [P] Run strict TypeScript validation using npm run typecheck
- [X] T017 [P] Verify rural accessibility hitboxes (>= 48x48dp) and contrast in app/(auth)/login.tsx
- [X] T018 Execute end-to-end verification scenarios per specs/002-local-login/quickstart.md on Web and Android

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup (T001, T002) - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion (T003, T004, T005)
- **User Story 2 (Phase 4)**: Depends on Foundational and US1 completion
- **User Story 3 (Phase 5)**: Depends on Foundational and US1 completion
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Foundation ready → Implements local identification screen and storage integration
- **User Story 2 (P2)**: Consumes session created by US1 in Splash Screen
- **User Story 3 (P3)**: Adds actions to Home to switch profile (US1 screen) or clear session (US2 splash re-route)

### Parallel Opportunities

- T001 and T002 can be started in parallel
- T016, T017, and T018 in Polish phase can run in parallel

---

## Parallel Example: Setup & Foundation

```bash
# Launch Phase 1 Setup tasks:
Task: "Update UserProfile and AuthSession types in types/user.ts"
Task: "Create storage key constants in constants/storage.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001, T002)
2. Complete Phase 2: Foundational (T003, T004, T005)
3. Complete Phase 3: User Story 1 (T006, T007, T008, T009)
4. **STOP and VALIDATE**: Test User Story 1 independently in browser/device
5. Deliver MVP!

### Incremental Delivery

1. Setup + Foundation → Storage e Context prontos
2. User Story 1 → Identificação local funcional (MVP)
3. User Story 2 → Splash screen com detecção automática de sessão
4. User Story 3 → Troca de perfil e Logout na Home
5. Polish → Verificação estrita de acessibilidade e tipagem TypeScript
