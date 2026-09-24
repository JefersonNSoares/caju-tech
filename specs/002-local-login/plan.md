# Implementation Plan: Identificação e Login Local (TEL-LOG-01)

**Branch**: `002-local-login` | **Date**: 2026-09-24 | **Spec**: [specs/002-local-login/spec.md](spec.md)  
**Input**: Feature specification from `/specs/002-local-login/spec.md`

---

## Summary

Implementação da tela e do fluxo de identificação e login local do CajuTech (TEL-LOG-01), permitindo que o usuário escolha seu perfil de atuação (Agricultor / Produtor Rural, Estudante / Extensionista, Visitante / Consumidor) e informe seu nome de exibição de maneira ágil, acessível e 100% desconectada (offline-first).

A arquitetura técnica adota persistência via `@react-native-async-storage/async-storage` para o perfil único ativo (`UserProfile`) e estado da sessão (`AuthSession`), gerenciamento reativo global através de um `AuthContext` (`useAuth()`), verificação de inicialização rápida na Splash Screen (< 2s) e suporte completo a troca de perfil e ação de "Sair / Redefinir" (limpeza de dados locais).

---

## Technical Context

**Language/Version**: TypeScript 5.3+ (Strict Mode)  
**Primary Dependencies**: Expo SDK 52, Expo Router v4, React 18.3, React Native 0.76, `@react-native-async-storage/async-storage` (1.23.1), NativeWind v4  
**Storage**: Armazenamento assíncrono local via AsyncStorage com chaves padronizadas (`@cajutech:user_profile`, `@cajutech:auth_session`)  
**Testing**: Verificação de tipos estritos (`npm run typecheck`), inspeção de hitboxes de acessibilidade (mínimo 48x48dp) e testes de fluxo no Web e Android  
**Target Platform**: Multiplataforma Universal (Android nativo + Web via React Native for Web)  
**Project Type**: Mobile & Web Application  
**Performance Goals**: Tempo de resposta tátil < 200ms na seleção de perfil; splash com verificação de sessão < 1.5s; persistência local < 10ms  
**Constraints**: Operação 100% autônoma e offline (zero dependência de rede para autenticar); alvos de toque >= 48x48dp; ausência total de telas em branco (< 400ms feedback visual)  
**Scale/Scope**: 1 perfil único ativo (< 1 KB em disco); componentes focados em `app/(auth)/login.tsx`, `app/(auth)/splash.tsx`, `services/authStorage.ts`, `hooks/useAuth.tsx` e integração na Home `app/(tabs)/index.tsx`  

---

## Constitution Check

*GATE: All checks evaluated and validated against CajuTech Constitution (v1.0.0).*

- [x] **Zero Telas em Branco (Principle I)**: A leitura da sessão no AsyncStorage exibe feedback visual contínuo na Splash Screen (`ActivityIndicator` e status de carregamento) em menos de 400ms, sem bloqueios ou telas congeladas.
- [x] **Linguagem e Usabilidade Rural (Principle II)**: Todos os botões, cards selecionáveis de perfil e inputs de texto cumprem estritamente o hitbox mínimo de 48x48dp. Rótulos amigáveis ("Amigo Produtor", "Sinal ausente"), sem exibição de erros técnicos.
- [x] **Regra dos 2 Toques (Principle III)**: A partir da tela principal, a troca de perfil ou saída é acessível em 1 toque (cabeçalho ou menu de perfil).
- [x] **Consistência Terminológica e Visual (Principle IV)**: Nomenclatura oficial mantida rigorosamente (`Cultivo`, `Derivados`, `Sustentabilidade`, `Recursos`, `Agricultor`, `Estudante`, `Visitante`). Paleta de cores rurais do CajuTech aplicada aos componentes.
- [x] **Isolamento e Retry em Falhas (Principle V)**: O processo de login é puramente local; falhas de conectividade externa não afetam nem impedem o acesso completo aos recursos locais.

---

## Project Structure

### Documentation (this feature)

```text
specs/002-local-login/
├── spec.md              # Especificação de requisitos funcionais (TEL-LOG-01)
├── checklists/
│   └── requirements.md  # Checklist de validação de qualidade da especificação
├── plan.md              # Este plano de implementação
├── research.md          # Decisões técnicas e arquiteturais (Phase 0)
├── data-model.md        # Esquema de dados, validações e ciclo de vida (Phase 1)
├── quickstart.md        # Guia passo a passo de verificação e testes (Phase 1)
├── contracts/           # Contratos TypeScript de serviço e contexto (Phase 1)
│   ├── auth-service.ts
│   └── auth-context.ts
└── tasks.md             # Tarefas de implementação (Phase 2 / speckit-tasks)
```

### Source Code Layout

```text
app/
├── _layout.tsx                 # Injeção do AuthProvider na raiz da aplicação
├── (auth)/
│   ├── _layout.tsx             # Configuração da stack de telas de autenticação
│   ├── splash.tsx              # TEL-ENT-01: Verificação de sessão salva e roteamento
│   └── login.tsx               # TEL-LOG-01: Interface de identificação, seleção e nome
└── (tabs)/
    └── index.tsx               # TEL-HOM-01: Exibição de saudação e ação rápida de perfil

services/
└── authStorage.ts              # Implementação de IAuthStorageService com AsyncStorage

hooks/
└── useAuth.tsx                 # Provedor AuthProvider e hook useAuth() reativo

types/
└── user.ts                     # Modelos TypeScript UserProfile, UserRole e AuthSession
```

---

## Implementation Phases & Deliverables

### Phase 0: Research & Architecture (Concluída)
- Decisão pelo `AsyncStorage` universal com chave `@cajutech:user_profile`.
- Decisão pelo `AuthContext` + `useAuth()` para estado global reativo sem dependências pesadas.
- Documento [`research.md`](research.md) consolidado.

### Phase 1: Data Model, Contracts & Verification (Concluída)
- Modelagem de dados e regras de sanitização em [`data-model.md`](data-model.md).
- Contratos TypeScript em [`contracts/auth-service.ts`](contracts/auth-service.ts) e [`contracts/auth-context.ts`](contracts/auth-context.ts).
- Guia de testes e validação em [`quickstart.md`](quickstart.md).
- Contexto de agentes atualizado em [`AGENTS.md`](../../AGENTS.md).

### Phase 2: Task Generation & Execution (Próximo Passo)
- Geração de lista ordenada e testável de tarefas atômicas via `/speckit-tasks`.
- Implementação de `services/authStorage.ts` e `hooks/useAuth.tsx`.
- Refatoração de `app/(auth)/login.tsx` e `app/(auth)/splash.tsx`.
- Integração da saudação e ação de troca de perfil na Home (`app/(tabs)/index.tsx`).

---

## Complexity Tracking

*Nenhuma violação identificada. A arquitetura segue rigorosamente a simplicidade, os princípios constitucionais e as ferramentas já instaladas no projeto CajuTech.*
