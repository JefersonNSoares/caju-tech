# Feature Specification: Módulo de Sustentabilidade e Inovação

**Feature Branch**: `003-sustentabilidade`  
**Created**: 2026-10-07  
**Status**: Draft  
**Input**: Especificar o módulo de Sustentabilidade e Inovação (index.tsx e rotas dinâmicas de detalhe)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Acesso à Listagem de Práticas Sustentáveis (Priority: P1)

Como extensionista ou produtor, eu quero acessar o módulo de Sustentabilidade para visualizar os diferentes cartões de práticas e inovações (Resíduos, Bioprodutos, Boas Práticas e Renda), para que eu possa explorar soluções de economia circular.

**Why this priority**: É o ponto de entrada principal do módulo.
**Independent Test**: Clicar na aba "Sustentabilidade" e verificar se a listagem exibe 4 cards corretos e se navega para as subpáginas corretamente.

### User Story 2 - Detalhamento das Práticas Sustentáveis (Priority: P2)

Como usuário do aplicativo, eu quero clicar em um card específico (ex: Aproveitamento de Resíduos) e ver detalhes técnicos, etapas e impactos dessa prática, para poder aplicá-los na minha realidade.

**Why this priority**: Fornece o valor educativo prático.
**Independent Test**: Navegar para `/sustentabilidade/[id]` e verificar conteúdo carregado offline.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST manter a listagem `app/(tabs)/sustentabilidade/index.tsx` já implementada.
- **FR-002**: O sistema MUST implementar a rota dinâmica `app/(tabs)/sustentabilidade/[id].tsx`.
- **FR-003**: Os dados DEVEM ser estáticos e locais (`services/sustentabilidadeService.ts`).
- **FR-004**: O sistema MUST respeitar a regra "Zero Telas em Branco" (TEL-EST-01).
- **FR-005**: Elementos clicáveis MUST ter hitbox de 48x48dp.

### Key Entities

- **PraticaSustentavel**: Identificador, título, tag, descrição, ícone.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Acesso aos detalhes em menos de 300ms.
- **SC-002**: 100% de disponibilidade offline.

## Accessibility & Consistency (Constitution)

- **Terminology**: `Economia Circular`, `Inovação Verde`.
- **UI Targets**: Hitbox de 48x48dp.
