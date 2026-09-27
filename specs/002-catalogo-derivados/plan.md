# Implementation Plan: Catálogo de Derivados e Aproveitamento Integral do Caju

**Branch**: `002-catalogo-derivados` | **Date**: 2026-09-24 | **Spec**: [specs/002-catalogo-derivados/spec.md](spec.md)  
**Input**: Feature specification from `specs/002-catalogo-derivados/spec.md`

## Summary

Implementar a rota dinâmica `app/(tabs)/derivados/[id].tsx` e o serviço de dados local `services/derivadosService.ts` no CajuTech, fornecendo um catálogo técnico e educativo detalhado sobre o aproveitamento integral dos derivados do caju (Castanha & LCC, Cajuína, Doces/Polpas e Fibra de Caju/Carne Vegetal). A solução integra as diretrizes constitucionais do projeto: total disponibilidade offline, áreas de toque mínimas de 48x48dp, navegação em no máximo 2 toques e prevenção de telas em branco através do componente `EmptyState` para rotas não mapeadas.

## Technical Context

**Language/Version**: TypeScript 5.x (Strict Mode)  
**Primary Dependencies**: React Native 0.76+, Expo SDK 52, Expo Router v4, React Native for Web, NativeWind v4 / StyleSheet responsivo, `@expo/vector-icons` (Feather)  
**Storage**: Catálogo de dados estáticos locais fortemente tipados em TypeScript (`types/derivados.ts` e `services/derivadosService.ts`), garantindo operação 100% offline imediata sem latência de rede  
**Testing**: Verificação estrita com `npm run typecheck` (`tsc --noEmit`), validação de rotas dinâmicas no Expo Router Web (`npm run web`) e Android (`npm run android`)  
**Target Platform**: Android (Smartphones de produtores rurais) e Web (React Native for Web para desktops e tablets)  
**Project Type**: Universal Mobile & Web App (Expo Router File-based Navigation)  
**Performance Goals**: Renderização da tela em menos de 200ms a partir do toque (meta constitucional < 300ms), 60fps na rolagem de listas e carregamento assíncrono em < 400ms  
**Constraints**: Operação offline indispensável, alvos de toque mínimos de 48x48dp (`AccessiblePressable`), largura máxima centralizada de 800px no desktop web, mensagens amigáveis em linguagem rural  
**Scale/Scope**: 1 rota dinâmica (`[id].tsx`), 1 arquivo de modelo de dados (`types/derivados.ts`), 1 serviço de dados estruturados (`services/derivadosService.ts`), atualização da listagem do catálogo (`app/(tabs)/derivados/index.tsx`)  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Zero Telas em Branco**: Implementação de renderização imediata com dados locais offline. Se um `id` inválido for informado, renderiza imediatamente o componente `EmptyState` com mensagem orientativa e botão de retorno para a lista. (Princípio I)
- [x] **Linguagem e Usabilidade Rural**: Rótulos e descrições sem jargões técnicos complexos, botões e cards de navegação com hitbox mínima de 48x48dp via `AccessiblePressable`, e dicas práticas diretas para o manejo da produção. (Princípio II)
- [x] **Regra dos 2 Toques**: Acesso direto a qualquer detalhe de derivado a partir da tela inicial em exatamente 2 toques (1º toque na aba *Derivados*, 2º toque no card do derivado escolhido). (Princípio III)
- [x] **Consistência Terminológica**: Título da aba mantido como `Derivados`, rotas idênticas em mobile e web, e tema visual alinhado com a paleta rural (`#2E7D32`, `#E65100`, `#FFF8E1`). (Princípio IV)
- [x] **Isolamento e Retry**: Rota dinâmica isolada; ausência de dependência de APIs externas voláteis para exibir os roteiros fundamentais de produção. (Princípio V)

## Project Structure

### Documentation (this feature)

```text
specs/002-catalogo-derivados/
├── spec.md              # Especificação de requisitos funcionais e critérios de aceitação
├── plan.md              # Este arquivo (plano técnico de implementação)
├── research.md          # Fase 0: Decisões técnicas e fundamentos de arquitetura
├── data-model.md        # Fase 1: Modelos TypeScript, dicionário de dados e entidades
├── quickstart.md        # Fase 1: Guia prático de teste e validação
├── contracts/           # Fase 1: Contratos de interface e componentes
│   └── derivados-detail.contract.md
└── checklists/
    └── requirements.md  # Checklist de qualidade da especificação
```

### Source Code (repository root)

```text
app/
└── (tabs)/
    └── derivados/
        ├── index.tsx           # Atualização: Conectar navegação router.push para cada derivado
        └── [id].tsx            # Novo: Tela dinâmica detalhada do derivado com passos e rendimento

components/
├── common/
│   ├── AccessiblePressable.tsx # Utilizado para botão de retorno (>= 48x48dp)
│   ├── Card.tsx                # Utilizado para os blocos de rendimento, passos e boas práticas
│   └── Button.tsx              # Botão de retorno e ações primárias
└── feedback/
    └── EmptyState.tsx          # Exibido quando id da rota dinâmica não for localizado

constants/
└── theme.ts                    # Cores da identidade rural e dimensões padrão

services/
└── derivadosService.ts         # Novo: Serviço provedor do catálogo dos 4 derivados locais

types/
├── derivados.ts                # Novo: Tipagem TypeScript completa de DerivadoDetail e PassoProcessamento
└── navigation.ts               # Atualização de parâmetros de rota para suportar [id]
```

**Structure Decision**: A adição da rota dinâmica `app/(tabs)/derivados/[id].tsx` preserva 100% da arquitetura padrão do Expo Router v4 existente. O serviço `services/derivadosService.ts` centraliza as informações agronômicas e agroindustriais, permitindo fácil expansão futura (ex.: inclusão de novos derivados ou sincronização opcional com backend remoto).

## Complexity Tracking

> **Nenhuma violação constitucional detectada. Todos os princípios foram atendidos com código limpo e componentes já estabelecidos.**

| Critério | Status | Justificativa |
|---|---|---|
| Complexidade Arquitetural | Baixa/Média | Utiliza convenção nativa do Expo Router e componentes reutilizáveis |
| Dependências Externas | Nenhuma nova | Utiliza as dependências do ecossistema já instalado (SDK 52) |
| Impacto de Rede | Zero | Catálogo 100% offline, prioritário para a realidade rural |
