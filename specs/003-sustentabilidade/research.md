# Research: Módulo de Sustentabilidade e Inovação

## Decisions

- **Decision 1: Estrutura de Rotas Dinâmicas**
  - **Decision**: Seguir a mesma estrutura de `/derivados/[id].tsx` para manter a consistência.
  - **Rationale**: Reduz complexidade cognitiva para o desenvolvedor e o usuário final, utilizando os componentes baseados em `Card` e `AccessiblePressable`.
  - **Alternatives considered**: Um painel single-page com expansão, mas rotas separadas favorecem deep linking.

- **Decision 2: Armazenamento de Dados**
  - **Decision**: Arquivo TypeScript estático contendo os detalhes das práticas (`sustentabilidadeService.ts`).
  - **Rationale**: Requisito de uso em modo offline nas zonas rurais (Zero Telas em Branco, operações sem rede).
  - **Alternatives considered**: SQLite ou AsyncStorage. Rejeitado pois os dados são lidos, mas não modificados pelo usuário neste MVP.
