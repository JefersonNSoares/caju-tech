# Research & Architecture Decisions: Catálogo de Derivados e Aproveitamento Integral do Caju

**Feature**: `002-catalogo-derivados`  
**Date**: 2026-09-24  
**Status**: Completed  

---

## 1. Contexto & Objetivos

O Módulo de Derivados do CajuTech tem como propósito apresentar aos agricultores familiares, técnicos agrícolas e estudantes do semiárido os processos práticos de beneficiamento do caju. O desafio central é combater o desperdício histórico de mais de **80% do pedúnculo** (falso fruto), que é frequentemente descartado após a colheita da castanha.

A tela dinâmica `app/(tabs)/derivados/[id].tsx` deve fornecer um roteiro técnico acessível, com rendimento econômico, lista de equipamentos, passos de preparo e recomendações sanitárias, funcionando 100% offline.

---

## 2. Decisões Técnicas de Arquitetura

### Decisão 1: Roteamento Dinâmico no Expo Router (`[id].tsx`)

- **Decisão**: Utilizar rota dinâmica baseada em arquivos `app/(tabs)/derivados/[id].tsx` com o hook `useLocalSearchParams<{ id: string }>()` do Expo Router v4.
- **Racional**:
  - Integra-se nativamente à pilha de abas existente `app/(tabs)/_layout.tsx` e `app/(tabs)/derivados/index.tsx`.
  - Suporta URLs amigáveis na Web (ex.: `http://localhost:8081/derivados/cajuina`) e deep linking nativo no Android.
  - Permite navegação fluida com histórico preservado e botão de retorno compatível com hitboxes de 48x48dp.
- **Alternativas Rejeitadas**:
  - *Query Params (`/derivados?id=...`)*: Rejeitado por gerar URLs menos semânticas e dificultar a indexação web e roteamento declarativo do Expo Router.
  - *Modais flutuantes*: Rejeitados porque o volume de informações técnicas (etapas, rendimento, segurança) requer uma página com rolagem vertical estruturada.

### Decisão 2: Modelo de Dados Local & Resiliência Offline

- **Decisão**: Criar um serviço local tipado em `services/derivadosService.ts` e modelos estritos em `types/derivados.ts`, disponibilizando dados completos em memória/bundle local para os 4 derivados principais:
  1. `castanha`: Castanha e LCC (Alto Valor Agregado)
  2. `cajuina`: Cajuína Tradicional Piauiense (Patrimônio Cultural)
  3. `doces`: Doces, Polpas e Compotas (Agricultura Familiar)
  4. `fibra`: Fibra de Caju / Carne Vegetal (Inovação & Desperdício Zero)
- **Racional**:
  - Produtores rurais e extensionistas frequentemente operam em áreas sem cobertura de internet móvel no campo.
  - Cumpre o Princípio I e II da Constituição: zero dependência de rede para visualização de conteúdo educativo fundamental.
  - Carregamento imediato (< 100ms), superando com folga o critério de < 300ms (SC-001).
- **Alternativas Rejeitadas**:
  - *Backend REST/GraphQL remoto*: Rejeitado para esta fase pois inviabilizaria o uso em áreas remotas e adicionaria complexidade de infraestrutura desnecessária.
  - *Banco SQLite local*: Rejeitado por adicionar overhead de inicialização para um catálogo curado de dados educativos que não sofre mutação pelo usuário comum.

### Decisão 3: Experiência Visual e Acessibilidade Rural (Hitbox >= 48x48dp)

- **Decisão**: Desenhar a tela `[id].tsx` com contêiner centralizado responsivo (`maxWidth: 800`), utilizando componentes compartilhados:
  - `AccessiblePressable` para o botão de voltar e links de ação com área mínima de 48x48dp.
  - `Card` estilizado com as cores do tema rural (`#2E7D32`, `#E8F5E9`, `#E65100`, `#FFF8E1`).
  - Lista sequencial de passos com crachá numérico de alta visibilidade e contraste.
  - Seção de "Aproveitamento do Fruto" com destaque visual nas métricas de conversão.
- **Racional**:
  - Cumpre rigorosamente o Princípio II (Linguagem e Usabilidade Rural) e o Princípio IV (Consistência Terminológica e Visual).
  - Garante legibilidade excelente mesmo sob luz solar forte ou em smartphones de entrada.

### Decisão 4: Tratamento de Identificadores Inválidos (Zero Telas em Branco)

- **Decisão**: Se o parâmetro `id` não for encontrado no serviço de dados (ex.: rota acessada diretamente com slug incorreto), renderizar imediatamente o componente `EmptyState` existente (`components/feedback/EmptyState.tsx`) com mensagem amigável:
  - Título: *"Derivado não encontrado"*
  - Descrição: *"O produto que você procura não está em nossa cesta de derivados do caju."*
  - Botão de ação: *"Voltar para Derivados"* levando de volta a `/(tabs)/derivados`.
- **Racional**:
  - Atende ao Princípio I (TEL-EST-01: Zero Telas em Branco) sem renderizar tela vazia ou lançar exceções não tratadas.

---

## 3. Resumo de Compatibilidade Constitucional

| Princípio | Requisito Constitucional | Solução na Arquitetura |
|---|---|---|
| **I. Zero Telas em Branco** | Estados assíncronos e EmptyState em falha | `EmptyState` renderizado se ID inexistente; dados locais instantâneos |
| **II. Usabilidade Rural** | Hitbox >= 48dp, linguagem direta sem jargão | `AccessiblePressable` no botão de volta; termos simples e claros |
| **III. Regra dos 2 Toques** | Máximo de 2 toques da Home | Home -> Aba Derivados -> Toque no card do derivado = 2 toques |
| **IV. Consistência Visual** | Cores rurais e rótulos unificados | Paleta de `constants/theme.ts` e termos oficiais preservados |
| **V. Isolamento e Retry** | Falhas não travam navegação global | Estado isolado na rota dinâmica; navegação preservada |
