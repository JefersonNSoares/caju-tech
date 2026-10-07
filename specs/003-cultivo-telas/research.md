# Research: Sub-telas de Cultivo e Vídeo Player

**Feature**: Sub-telas de Cultivo e Ajuste de Layout  
**Date**: 2026-10-07  

---

## 1. Alinhamento Vertical e Responsividade da Tela Principal

- **Decisão**: Utilizar layout flex vertical com NativeWind (`flex flex-col gap-4 w-full max-w-2xl mx-auto`) mantendo o container ScrollView.
- **Racional**: No mobile, cada botão ocupa a largura quase total com margens confortáveis (16dp). No desktop/tablet web, o `max-w-2xl` evita que os cards fiquem desproporcionalmente esticados horizontalmente, mantendo alinhamento vertical elegante e leitura agradável.
- **Alternativas consideradas**:
  - Grid de 2 colunas: Rejeitado pelo requisito explícito ("alinhados verticalmente (um embaixo do outro)").
  - Lista fixa sem ScrollView: Rejeitado para garantir compatibilidade com telas pequenas e modos paisagem.

---

## 2. Estrutura de Rotas e Navegação

- **Decisão**: Criar rotas dedicadas estáticas em `app/(tabs)/cultivo/`:
  - `plantio.tsx`
  - `irrigacao.tsx`
  - `poda.tsx`
  - `pragas.tsx`
  E registrar cada rota em `app/(tabs)/_layout.tsx` com `options={{ href: null }}`.
- **Racional**: Expo Router v4 cria abas automáticas na TabBar para arquivos sob `(tabs)` a menos que o `href: null` seja explicitado no layout de abas. Isso preserva a TabBar original (5 abas: Início, Cultivo, Derivados, Sustentabilidade, Recursos).
- **Alternativas consideradas**:
  - Rota dinâmica `cultivo/[slug].tsx`: Foi considerada, mas o requisito sênior explicitou a criação de arquivos específicos (`plantio.tsx`, `irrigacao.tsx`, `poda.tsx`, `pragas.tsx`). Utilizaremos um componente base reutilizável ou páginas modulares que consom o catálogo unificado de cultivo (`cultivoService.ts`).

---

## 3. Placeholder de Vídeo e Player Modal Responsivo

- **Decisão**: Criar um componente reutilizável `VideoCardPlaceholder.tsx` e um componente `VideoPlayerModal.tsx` integrado (ou alternativamente tela/modal dedicado).
- **Racional**:
  - O modal responsivo exibe o player com aspecto widescreen 16:9, banner/thumbnail atrativo, overlay escuro de cinema, controles de play/pause simulados, barra de progresso e a transcrição/resumo agronômico detalhado logo abaixo.
  - O modal funciona de forma nativa e web com fechamento imediato (botão "X" e backdrop clicável com hitbox >= 48dp), sem exigir dependências pesadas de streaming de vídeo nativo nesta fase de protótipo funcional.
- **Alternativas consideradas**:
  - Rota separada para cada vídeo (`/cultivo/video/[id]`): Mais lenta de carregar e quebra o fluxo de leitura do agricultor. O modal mantém o usuário no contexto da fase técnica com retorno imediato em 1 toque.

---

## 4. Fonte de Dados Agronômicos

- **Decisão**: Centralizar o conteúdo de cada fase em `services/cultivoService.ts` e `types/cultivo.ts`.
- **Racional**: Garante zero dependência de rede (100% offline), carregamento < 100ms e fácil manutenção futura caso seja conectado a uma API ou CMS.
