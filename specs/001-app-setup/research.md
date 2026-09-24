# Phase 0: Research & Technical Decisions - Universal App Setup

**Feature**: CajuTech Universal App Setup  
**Branch**: `001-app-setup`  
**Date**: 2026-09-19  

## 1. Project Scaffolding & Expo Framework Choice

### Decision
Utilizar **Expo SDK 52** com **Expo Router v4** em modo TypeScript estrito (`strict: true`), com configuração de Metro bundler para saída universal (Android e Web via `react-native-web`).

### Rationale
- O Expo SDK 52 traz suporte nativo a React 18 / React Native 0.76+, com Metro para Web como bundler padrão e Expo Router v4 oferecendo roteamento universal baseado no sistema de arquivos.
- Atende plenamente à exigência da Constituição (Seção "Plataforma e Stack Tecnológica") e ao requisito **FR-001**, **FR-002** e **FR-003** da especificação.
- Facilita a manutenção unificada do código em uma única árvore de arquivos (`app/`), eliminando divergências entre Android e Web.

### Alternatives Considered
- **React Native CLI puro (Bare workflow inicial)**: Rejeitado por exigir manutenção manual de toolchains Android e Web (Webpack/Vite), aumentando drasticamente a complexidade sem benefício para a meta inicial de prototipagem e desenvolvimento educacional.
- **Expo SDK 49/50**: Rejeitado por estar defasado em relação às APIs mais recentes do Expo Router e suporte a React 18/Web.

---

## 2. Estilização: NativeWind v4 e Design Tokens Rurais

### Decision
Adotar **NativeWind v4** configurado com Tailwind CSS v3 e uma camada de tokens tipados em `constants/theme.ts` (paleta verde/terrosa do semiárido e dimensões mínimas de toque).

### Rationale
- Permite uso de classes utilitárias no JSX compartilhadas entre Web e Android sem perda de desempenho.
- O arquivo `constants/theme.ts` centraliza as cores rurais oficiais (tons de verde folha, castanha, pedúnculo/caju amarelo-avermelhado e tons neutros de alto contraste) e as hitboxes mínimas de 48x48dp.
- Assegura cumprimento direto do **Princípio II** (Linguagem e Usabilidade Rural - hitbox >= 48x48dp) e do requisito **FR-004**.

### Alternatives Considered
- **Pure StyleSheet sem Tailwind**: Rejeitado por gerar código mais verboso e dificultar breakpoints responsivos para a versão desktop Web.
- **Styled-Components / Emotion**: Rejeitado pelo overhead de runtime e possíveis incompatibilidades de CSS-in-JS no motor Hermes em celulares Android de entrada.

---

## 3. Detecção de Conexão e Gerenciamento Offline

### Decision
Implementar o hook universal `useNetworkStatus` unificando `@react-native-community/netinfo` (nativo) e a Web Network API (`navigator.onLine`, listeners `online`/`offline`).

### Rationale
- Produtores rurais e estudantes no semiárido frequentemente operam em áreas com conectividade intermitente ou ausente.
- A detecção precisa do estado de rede viabiliza a exibição imediata do `OfflineBanner` e o bloqueio de requisições desnecessárias, salvaguardando o **Princípio I** (Zero Telas em Branco) e **Princípio V** (Isolamento e Retry em Falhas).

### Alternatives Considered
- **Verificação passiva via `try/catch` de fetch**: Rejeitada porque não alerta proativamente o usuário antes que ele tente realizar ações online, violando a regra de feedback preventivo rural.

---

## 4. Componentes Base de Acessibilidade e Hitbox Rural (>= 48x48dp)

### Decision
Criar componentes fundamentais em `components/common/` (`AccessiblePressable.tsx` e `Button.tsx`) que encapsulam `minWidth: 48` e `minHeight: 48`, garantindo acessibilidade arquitetural por padrão.

### Rationale
- Sob sol forte e em campo, toques imprecisos com dedos grossos ou luvas de lida agrícola causam frustração se as áreas de clique forem pequenas.
- Ao forçar `minWidth: 48` e `minHeight: 48` no componente base, nenhum desenvolvedor conseguirá criar botões ou abas que violem o **Princípio II** da Constituição (Hitbox mínima 48x48dp).

### Alternatives Considered
- **Auditoria manual ou via linting de estilização**: Rejeitada por depender de disciplina humana em vez de garantias arquiteturais rígidas.

---

## 5. Estados Assíncronos Universais (Zero Telas em Branco - TEL-EST-01)

### Decision
Construir os 4 componentes compartilhados em `components/feedback/`:
1. `Skeleton.tsx`: Animação suave de carregamento com resposta em < 400ms.
2. `EmptyState.tsx`: Ilustração e texto explicativo amigável rural quando não houver dados.
3. `OfflineBanner.tsx`: Indicador visual discreto ("Sinal ausente - navegando offline").
4. `ErrorCard.tsx`: Exibição de falha com linguagem simples ("Instabilidade temporária") e botão "Tentar novamente" com retry granular isolado.

### Rationale
- Cumpre integralmente os **Princípios I, II e V** da Constituição CajuTech.
- Garante que nenhuma tela fique em branco ou apresente erros técnicos como `HTTP 500` ou `NetworkError`.

### Alternatives Considered
- **Componentes de feedback avulsos por tela**: Rejeitado por ferir o Princípio IV (Consistência) e multiplicar código repetitivo.
