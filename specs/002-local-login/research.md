# Research & Technical Decisions: Identificação e Login Local (TEL-LOG-01)

**Feature**: `002-local-login`  
**Date**: 2026-09-24  
**Status**: Completed  

---

## 1. Armazenamento Local de Sessão e Perfil

- **Decision**: Utilizar `@react-native-async-storage/async-storage` para persistência local do perfil do usuário e do estado da sessão.
- **Rationale**: 
  - A dependência já está instalada e configurada com suporte universal e estrito para Android e Web (`@react-native-async-storage/async-storage: 1.23.1`).
  - O fluxo de identificação local não manipula senhas criptográficas, segredos de API ou tokens confidenciais de terceiros; armazena apenas dados estruturais de perfil (`id`, `role`, `displayName`, `preferredCity`).
  - O overhead de serialização JSON para objetos de menos de 1 KB é desprezível (< 5ms de I/O assíncrono), garantindo resposta quase instantânea no ciclo de vida da aplicação.
- **Alternatives considered**:
  - `expo-secure-store`: Rejeitado porque requer keychain/keystore nativos (não suporta React Native for Web sem mocks ou condicionais) e adicionaria complexidade desnecessária para dados de perfil não-sensíveis.
  - `react-native-mmkv`: Rejeitado porque exige compilação nativa JSI personalizada com setup adicional, gerando atrito no fluxo Expo universal sem ganho perceptível para o volume de dados de um único perfil local.
  - `SQLite / WatermelonDB`: Rejeitado por ser um exagero arquitetural para persistir uma única entidade de perfil e estado de sessão.

---

## 2. Gerenciamento de Estado da Autenticação

- **Decision**: Implementar um `AuthContext` compartilhado com um hook dedicado `useAuth()`.
- **Rationale**:
  - O React Context integrado ao ciclo de vida da raiz da aplicação (`app/_layout.tsx`) disponibiliza de forma reativa os dados do usuário (`user`), o status de carregamento (`isLoading`), se há sessão ativa (`isAuthenticated`) e métodos de controle (`login`, `logout`, `switchRole`).
  - Evita prop drilling através das rotas do Expo Router e mantém a arquitetura limpa, desacoplada e 100% tipada em TypeScript.
  - Suporta inicialização assíncrona automática lendo o `AsyncStorage` na montagem do app.
- **Alternatives considered**:
  - `Redux Toolkit / RTK Query`: Rejeitado por adicionar boilerplate excessivo (slices, store, dispatch, reducers) para um escopo de autenticação puramente local.
  - `Zustand`: Embora seja leve, adicionaria uma biblioteca externa nova ao `package.json` quando a API padrão de React Context do React 18 atende com perfeição à escala e requisitos.

---

## 3. Fluxo de Splash e Redirecionamento de Sessão

- **Decision**: O componente `app/(auth)/splash.tsx` atuará em conjunto com o `AuthContext` para verificar a presença de uma sessão válida gravada no dispositivo.
- **Rationale**:
  - Respeita o Princípio I da Constituição (*Zero Telas em Branco*): durante o carregamento da sessão (< 1.5s), a splash exibe feedback contínuo.
  - Se a sessão existir, redireciona diretamente com `router.replace('/(tabs)')`.
  - Se não houver sessão ativa (primeiro acesso ou após o usuário acionar "Sair / Redefinir"), redireciona suavemente para a tela de identificação `app/(auth)/login.tsx`.
- **Alternatives considered**:
  - `Redirect imediato no _layout.tsx`: Rejeitado porque pode causar flash visual e desrespeitar o tempo estético de apresentação da marca CajuTech (< 3s estabelecido na constituição TEL-ENT-01).

---

## 4. Usabilidade Rural, Acessibilidade e Hitbox Mínima

- **Decision**: Utilizar `AccessiblePressable` nos cartões de perfil e `TextInput` com altura mínima de 48dp, bordas contrastantes e feedback de seleção imediato (< 200ms).
- **Rationale**:
  - Cumpre rigorosamente o Princípio II da Constituição (dimensões mínimas de 48x48dp para interação com luvas de trabalho ou sob sol forte).
  - Inclui suporte a `accessibilityRole="radio"` e `accessibilityState={{ checked: isSelected }}` para leitores de tela e acessibilidade motora.
  - O campo de nome de exibição terá limite visual de 40 caracteres com sanitização de espaços e suporte completo a acentuação do português brasileiro.
  - Se o usuário não informar o nome, o sistema atribui automaticamente um nome amigável com base no papel selecionado ("Produtor Rural", "Estudante", "Visitante") para evitar bloqueios ou validações desnecessárias que frustrem o usuário.
- **Alternatives considered**:
  - Formulário com validação rígida de campos obrigatórios: Rejeitado por contrariar o princípio da usabilidade rural direta e criar atrito no primeiro contato do produtor com a ferramenta.
