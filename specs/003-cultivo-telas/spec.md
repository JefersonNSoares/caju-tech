# Feature Specification: Sub-telas de Cultivo e Ajuste de Layout

**Feature Branch**: `feat/003-cultivo-telas`  
**Created**: 2026-10-07  
**Status**: Ready for Implementation  
**Input**: Ajustar a tela principal de Cultivo (layout vertical responsivo), criar as 4 sub-telas de etapas (plantio, irrigacao, poda, pragas) com textos explicativos, área para 2 vídeos com componente placeholder visual (capa + play) e interação de exibição com player ampliado e descrição/resumo.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Acesso e Navegação Vertical no Módulo de Cultivo (Priority: P1)

Como produtor rural ou extensionista agrícola, eu quero acessar a tela principal de Cultivo (`/cultivo`) e visualizar os botões das etapas alinhados verticalmente (um embaixo do outro) de forma responsiva em smartphones e no PC, para que eu possa navegar com clareza e facilidade de toque para a fase desejada.

- **Why this priority**: É o ponto de entrada primário do módulo de Cultivo; organiza a experiência do usuário com alinhamento vertical limpo e hitboxes confortáveis sob condições de campo.
- **Independent Test**: Acessar `app/(tabs)/cultivo/index.tsx`, verificar a renderização vertical dos 4 cards de fase (Plantio, Irrigação, Poda e Adubação, Controle de Pragas) com NativeWind/Tailwind e clicar em cada um para garantir o redirecionamento para sua respectiva sub-rota.

### User Story 2 - Sub-telas de Conteúdo Técnico de Cultivo (Priority: P1)

Como usuário do aplicativo, eu quero abrir a sub-tela de uma etapa específica (Plantio e Espaçamento, Irrigação, Poda e Adubação ou Controle de Pragas) e encontrar orientações agronômicas introdutórias no topo, seguidas por uma seção dedicada a 2 vídeos educativos com títulos e duração.

- **Why this priority**: Fornece o valor educacional prático de cada fase da cultura do cajueiro, cumprindo o objetivo agronômico do app.
- **Independent Test**: Navegar para `/cultivo/plantio`, `/cultivo/irrigacao`, `/cultivo/poda` e `/cultivo/pragas`, conferindo a presença de botão de retorno (hitbox >= 48dp), resumo explicativo agronômico no topo e a seção contendo 2 cards de vídeo.

### User Story 3 - Visualização de Vídeo e Resumo Técnico Ampliado (Priority: P2)

Como produtor ou estudante, eu quero clicar no placeholder de vídeo de uma sub-tela e abrir um Player de Vídeo em destaque (ou modal responsivo) com proporção 16:9, informações de reprodução e a descrição/resumo técnico aprofundado do vídeo, para que eu possa assimilar o conhecimento visual e teórico sem atrito.

- **Why this priority**: Garante a experiência multimídia interativa prometida no protótipo do Figma, permitindo leitura do resumo e visualização ampliada tanto em telas pequenas quanto no desktop.
- **Independent Test**: Clicar em qualquer card/placeholder de vídeo nas sub-telas e validar a abertura do player/modal ampliado com título, descrição completa e botão de fechar com hitbox acessível.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O layout de `app/(tabs)/cultivo/index.tsx` MUST alinhar verticalmente os 4 botões de navegação, ocupando largura responsiva (`w-full max-w-2xl mx-auto`) com NativeWind.
- **FR-002**: Cada botão de `app/(tabs)/cultivo/index.tsx` MUST navegar para sua respectiva sub-tela (`/cultivo/plantio`, `/cultivo/irrigacao`, `/cultivo/poda`, `/cultivo/pragas`).
- **FR-003**: O sistema MUST criar as 4 rotas de sub-telas dentro de `app/(tabs)/cultivo/`:
  - `plantio.tsx`: Plantio e Espaçamento
  - `irrigacao.tsx`: Irrigação e Recursos Hídricos
  - `poda.tsx`: Poda e Adubação
  - `pragas.tsx`: Controle de Pragas e Doenças
- **FR-004**: Cada sub-tela MUST apresentar no topo um header com botão de voltar acessível (hitbox >= 48dp), título da fase e texto explicativo introdutório com recomendações agronômicas.
- **FR-005**: Abaixo do texto, cada sub-tela MUST exibir um container estruturado para 2 vídeos temáticos.
- **FR-006**: O sistema MUST implementar um componente reutilizável de placeholder de vídeo (`VideoCardPlaceholder`) contendo imagem de capa estilizada (proporção 16:9), ícone centralizado de play com círculo translúcido/destaque, badge de duração estimada, título e breve introdução.
- **FR-007**: Ao clicar em um placeholder de vídeo, o sistema MUST abrir uma interface de Player responsivo (modal ou tela de destaque) exibindo a área ampliada do vídeo com controles simulados e o texto de resumo/descrição técnica correspondente.
- **FR-008**: O layout de abas `app/(tabs)/_layout.tsx` MUST registrar as 4 novas sub-telas com `options={{ href: null }}` para evitar que sejam exibidas como itens indesejados na TabBar inferior.
- **FR-009**: Todas as áreas interativas MUST satisfazer a hitbox mínima de 48x48dp (TEL-NAV-01 / Princípio II da Constituição).
- **FR-010**: O sistema MUST funcionar com disponibilidade 100% offline, alimentado por catálogo local tipado em `types/cultivo.ts` e `services/cultivoService.ts`.

---

## Key Entities

- **CultivoStage**: Identificador da fase (`plantio`, `irrigacao`, `poda`, `pragas`), título, descrição curta, ícone Feather, resumo técnico detalhado e lista de vídeos recomendados.
- **CultivoVideo**: Identificador do vídeo, título, descrição/resumo completo, duração estimada (ex: "04:15 min"), thumbnail/tema visual e categoria.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Tempo de transição entre a listagem principal e qualquer sub-tela inferior a 300ms.
- **SC-002**: 100% de responsividade validada em viewport mobile (360x640dp) e desktop (1024px+).
- **SC-003**: 100% dos botões e áreas clicáveis cumprindo a diretriz de hitbox de pelo menos 48x48dp.
- **SC-004**: Zero dependência de conexão de rede externa para renderização das 4 telas e seus vídeos demonstrativos.
