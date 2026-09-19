# Implementation Plan: CajuTech Universal App Setup

**Branch**: `001-app-setup` | **Date**: 2026-09-19 | **Spec**: [specs/001-app-setup/spec.md](file:///Users/jefersonsoares/Desktop/Projetos/caju-tech/specs/001-app-setup/spec.md)  
**Input**: Feature specification from `specs/001-app-setup/spec.md`

## Summary

Implementar a estrutura universal inicial da aplicação CajuTech utilizando Expo SDK 52 com Expo Router v4 e TypeScript estrito, suportando compilação e execução tanto para Web (React Native for Web) quanto para Android. O setup integra os padrões da Constituição do CajuTech: garantia de hitboxes mínimas de 48x48dp, paleta rural/verde do semiárido, componentes reutilizáveis para os 4 estados assíncronos (Zero Telas em Branco) e roteamento de 5 abas principais acessíveis em no máximo 2 toques.

## Technical Context

**Language/Version**: TypeScript 5.x (Strict Mode), Node.js v20+ (Ambiente: v26.0.0, npm 11.12.1)  
**Primary Dependencies**: Expo SDK 52, React 18, React Native 0.76+, Expo Router v4, React Native for Web (`react-native-web`, `react-dom`), NativeWind v4 (`tailwindcss` v3), `@expo/vector-icons`  
**Storage**: `@react-native-async-storage/async-storage` (preparado para cache e persistência offline)  
**Testing**: Verificação de compilação TypeScript estrita (`npx tsc --noEmit`), execução e validação visual de rotas Web e Android  
**Target Platform**: Android (Mobile) & Web (Desktop e Mobile responsivo)  
**Project Type**: Universal Mobile & Web App (Expo Universal Workflow)  
**Performance Goals**: Hot Reload < 2s, Skeleton loader exibido em < 400ms, transições de tela fluidas a 60fps  
**Constraints**: Operação resiliente offline, hitbox mínima obrigatória de 48x48dp em botões e abas, sem telas em branco, mensagens amigáveis rurais (sem erros técnicos expostos)  
**Scale/Scope**: Setup base universal com 5 rotas de abas (`(tabs)`), 2 rotas de identificação (`(auth)`), 4 componentes universais de feedback (`components/feedback/`), 2 primitivas acessíveis (`components/common/`) e tokens tipados de design (`constants/theme.ts`)  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Zero Telas em Branco**: Componentes `Skeleton`, `EmptyState`, `OfflineBanner` e `ErrorCard` planejados com renderização em < 400ms e 4 estados assíncronos implementados no modelo de dados. (Princípio I)
- [x] **Linguagem e Usabilidade Rural**: Primitiva `AccessiblePressable` e `Button` encapsulam área de toque mínima de 48x48dp. Mensagens de erro padronizadas sem termos técnicos. (Princípio II)
- [x] **Regra dos 2 Toques**: Estrutura de navegação Expo Router direta com 5 abas na raiz, alcançando qualquer módulo principal em no máximo 2 toques. (Princípio III)
- [x] **Consistência Terminológica**: Títulos e rotas padronizados: `Início`, `Cultivo`, `Derivados`, `Sustentabilidade` e `Recursos` idênticos em Web e Android. (Princípio IV)
- [x] **Isolamento e Retry**: Falhas de serviços tratadas de forma granular via `ErrorCard` com botão "Tentar novamente" sem recarregar a aplicação inteira. (Princípio V)

## Project Structure

### Documentation (this feature)

```text
specs/001-app-setup/
├── plan.md              # Este arquivo (especificação técnica da implementação)
├── research.md          # Fase 0: Decisões técnicas e fundamentos de arquitetura
├── data-model.md        # Fase 1: Entidades, modelos TypeScript e tokens
├── quickstart.md        # Fase 1: Guia prático de execução e validação
├── contracts/           # Fase 1: Contratos de interface e componentes
│   ├── feedback-components.contract.md
│   ├── common-components.contract.md
│   └── navigation-routes.contract.md
└── checklists/
    └── requirements.md  # Checklist de qualidade da especificação
```

### Source Code (repository root)

```text
app/
├── _layout.tsx                 # Root layout universal com SafeArea e provedores globais
├── (auth)/
│   ├── _layout.tsx             # Stack de autenticação / splash
│   ├── splash.tsx              # TEL-ENT-01: Splash screen com carregamento (<3s)
│   └── login.tsx               # TEL-LOG-01: Seleção de perfil (Agricultor, Estudante, Visitante)
└── (tabs)/
    ├── _layout.tsx             # TEL-NAV-01: Tab bar universal com 5 rotas
    ├── index.tsx               # TEL-HOM-01: Dashboard / Início
    ├── cultivo/
    │   └── index.tsx           # Módulo 1: Listagem das fases do cultivo
    ├── derivados/
    │   └── index.tsx           # Módulo 2: Catálogo de derivados e subprodutos
    ├── sustentabilidade/
    │   └── index.tsx           # Módulo 3: Painel de gestão, clima Piripiri-PI e cotações
    └── recursos/
        └── index.tsx           # Módulo 4: Submenu de Quiz, Cartilha e Mídias

components/
├── common/
│   ├── AccessiblePressable.tsx # Hitbox mínima garantida de 48x48dp
│   ├── Button.tsx              # Botão padrão com paleta rural
│   └── Card.tsx                # Container padrão com cantos arredondados e borda sutil
├── feedback/
│   ├── Skeleton.tsx            # Indicador de carregamento (< 400ms)
│   ├── EmptyState.tsx          # Feedback amigável para listas vazias
│   ├── OfflineBanner.tsx       # Alerta de sinal rural ausente
│   └── ErrorCard.tsx           # Falha isolada com ação "Tentar novamente"
├── media/                      # Placeholders para leitor PDF, player e zoom de imagem
└── navigation/
    ├── TabBar.tsx              # TabBar mobile com área de toque mínima
    └── WebSidebar.tsx          # Menu adaptativo para navegação em desktop web

constants/
└── theme.ts                    # Cores da identidade rural, espaçamentos e hitboxes

hooks/
└── useNetworkStatus.ts         # Hook universal de detecção de conectividade (Web/Mobile)

services/                       # Módulos de serviços e APIs isoladas

types/
├── theme.ts                    # Tipagens de tokens visuais
├── network.ts                  # Tipagens de estado de rede
├── state.ts                    # Tipagens de estados assíncronos (4 estados)
├── user.ts                     # Tipagens de perfil de usuário
└── navigation.ts               # Tipagens de rotas do Expo Router

app.json                        # Configuração do Expo Universal
package.json                    # Dependências e scripts de execução
tsconfig.json                  # Configuração estrita do TypeScript
tailwind.config.js              # Configuração dos tokens no NativeWind/Tailwind
metro.config.js                 # Configuração do Metro bundler com suporte a Web
```

**Structure Decision**:
Projeto universal único baseado em Expo e Expo Router, compartilhando 100% da lógica e componentes de tela entre Android e Web. Essa decisão elimina duplicação de esforço, mantém a paridade de funcionalidades e cumpre todos os requisitos arquiteturais estabelecidos na Constituição.

## Complexity Tracking

> Nenhuma violação aos princípios constitucionais detectada. O projeto adota arquitetura enxuta, sem camadas desnecessárias de abstração.
