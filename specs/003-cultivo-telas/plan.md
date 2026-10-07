# Implementation Plan: Sub-telas de Cultivo e Ajuste de Layout

**Branch**: `feat/003-cultivo-telas` | **Date**: 2026-10-07 | **Spec**: [specs/003-cultivo-telas/spec.md](spec.md)  
**Input**: Feature specification from `specs/003-cultivo-telas/spec.md`

## Summary

Ajustar o layout da tela principal do módulo Cultivo (`app/(tabs)/cultivo/index.tsx`) para posicionar os 4 botões de navegação verticalmente (um embaixo do outro), ocupando a largura adequada de tela de forma responsiva para celular e PC via NativeWind. Criar as 4 sub-rotas correspondentes (`plantio.tsx`, `irrigacao.tsx`, `poda.tsx`, `pragas.tsx`), dotadas de cabeçalho explicativo, container para 2 vídeos e componente de placeholder visual com ícone de play, integrando com modal/player de exibição do vídeo ampliado acompanhado de sua respectiva descrição/resumo técnico.

---

## Technical Context

**Language/Version**: TypeScript 5.x (Strict Mode)  
**Primary Dependencies**: React Native, Expo Router v4, NativeWind, `@expo/vector-icons` (Feather)  
**Storage**: Dados estáticos locais offline (`types/cultivo.ts` e `services/cultivoService.ts`)  
**Testing**: Verificação manual via Expo Web/Mobile e `npm run typecheck`  
**Target Platform**: Universal (Android + Web Desktop/Mobile)  
**Performance Goals**: Carregamento instantâneo (< 200ms) sem latência de rede  
**Constraints**: Hitbox mínima >= 48x48dp, 100% offline, zero telas em branco  

---

## Constitution Check

- [x] **Zero Telas em Branco (TEL-EST-01)**: Sub-telas com conteúdo local imediato, sem dependência de APIs externas que possam falhar.
- [x] **Linguagem e Usabilidade Rural**: Rótulos e descrições agrícolas acessíveis ("Plantio e Espaçamento", "Irrigação e Recursos Hídricos", etc.); alvos de toque com dimensão mínima de 48x48dp.
- [x] **Regra dos 2 Toques (TEL-NAV-01)**: Da Home, 1 toque abre a aba Cultivo e o 2º toque abre a sub-tela desejada.
- [x] **Consistência Terminológica e Visual**: Paleta verde e terra oficial (`THEME`), cabeçalho unificado e tipografia alinhada.
- [x] **Isolamento de Falhas e Retry**: Módulo 100% autônomo e isolado de falhas de serviços externos.

---

## Project Structure

### Documentation

```text
specs/003-cultivo-telas/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── cultivo-screens.contract.md
└── tasks.md
```

### Source Code

```text
types/
└── cultivo.ts

services/
└── cultivoService.ts

components/
└── media/
    ├── VideoCardPlaceholder.tsx
    └── VideoPlayerModal.tsx

app/
└── (tabs)/
    ├── _layout.tsx                  # Registro com href: null para as novas sub-rotas
    └── cultivo/
        ├── index.tsx                # Layout com botões verticais responsivos
        ├── plantio.tsx              # Sub-tela 1
        ├── irrigacao.tsx            # Sub-tela 2
        ├── poda.tsx                 # Sub-tela 3
        └── pragas.tsx               # Sub-tela 4
```

---

## Complexity Tracking

| Critério | Status | Justificativa |
|---|---|---|
| Complexidade Arquitetural | Baixa | Rotas estáticas diretas sob `(tabs)/cultivo` com modal responsivo |
| Risco de Regressão | Baixo | Uso de `href: null` preserva a TabBar inferior intacta |
