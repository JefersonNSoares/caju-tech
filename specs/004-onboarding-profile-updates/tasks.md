# Tasks: Onboarding & Profile Updates

**Input**: Design documents from `specs/004-onboarding-profile-updates/`  
**Branch**: `feature/onboarding-profile-updates`

## Phase 1: Setup & Foundational

- [x] T001 Criar componente de Logótipo oficial CajuTech com placeholder visual em `components/common/CajuTechLogo.tsx`
- [x] T002 Configurar redirecionamento de entrada da raiz em `app/index.tsx`

---

## Phase 2: User Story 1 - Nova Tela Inicial (SplashScreen) (Priority: P1)

**Goal**: Criar nova tela inicial limpa e centralizada com o Logótipo do CajuTech, texto educativo e botão "INICIAR" que navega para a Seleção de Perfil.  
**Independent Test**: Acessar o app e verificar a exibição da tela inicial com os 3 elementos principais e navegação no clique do botão.

- [x] T003 [US1] Implementar layout limpo e centralizado na tela inicial em `app/(auth)/splash.tsx`
- [x] T004 [US1] Integrar o Logótipo oficial do CajuTech com indicação de placeholder no centro em `app/(auth)/splash.tsx`
- [x] T005 [US1] Adicionar texto explicativo sobre o cultivo e aproveitamento dos derivados do caju em `app/(auth)/splash.tsx`
- [x] T006 [US1] Adicionar botão verde de ação "INICIAR" e conectar navegação para `/(auth)/login` em `app/(auth)/splash.tsx`

---

## Phase 3: User Story 2 - Atualização do Fluxo e Cabeçalho do Perfil (Priority: P1)

**Goal**: Atualizar o botão de perfil na tela de módulos para "Alterar Perfil" e atualizar o cabeçalho da tela de perfil com o Logótipo oficial do CajuTech.  
**Independent Test**: Verificar o botão "Alterar Perfil" na tela de módulos e o novo cabeçalho com Logótipo CajuTech na tela de seleção de perfil.

- [x] T007 [US2] Modificar o rótulo do botão de perfil na tela de módulos para "Alterar Perfil" em `app/(tabs)/index.tsx`
- [x] T008 [US2] Atualizar cabeçalho da tela de seleção de perfil substituindo o antigo indicador pelo Logótipo oficial em `app/(auth)/login.tsx`
- [x] T009 [US2] Garantir preservação estrita da estrutura de rádio e do botão "Continuar para a Aplicação" em `app/(auth)/login.tsx`

---

## Phase 4: Polish & Validation

- [x] T010 Validar conformidade de acessibilidade rural e hitboxes mínimas de 48x48dp em todas as novas interações
- [x] T011 Executar validação de tipos estritos TypeScript com `npm run typecheck`
- [x] T012 Validar compilação e empacotamento web universal com `npx expo export -p web`
