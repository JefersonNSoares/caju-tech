# Interface Contract: Derivados Detail Screen & Data Service

**Feature**: `002-catalogo-derivados`  
**Date**: 2026-09-24  
**Status**: Draft  

---

## 1. Rota Dinâmica Expo Router

- **Caminho**: `app/(tabs)/derivados/[id].tsx`
- **Roteador**: Expo Router v4
- **Parâmetros Locais**:
  ```typescript
  type RouteParams = {
    id: string; // 'cajuina' | 'castanha' | 'doces' | 'fibra'
  };
  ```

---

## 2. Contrato do Serviço (`services/derivadosService.ts`)

```typescript
import { DerivadoDetail, DerivadoCategoria } from '../types/derivados';

export interface IDerivadosService {
  /**
   * Retorna os detalhes completos de um derivado com base no identificador.
   * Retorna undefined se o identificador não for reconhecido.
   */
  getDerivadoById(id: string): DerivadoDetail | undefined;

  /**
   * Retorna a lista de resumos de todos os derivados disponíveis no catálogo.
   */
  getAllDerivados(): DerivadoDetail[];
}
```

---

## 3. Contrato de Componente da Tela (`app/(tabs)/derivados/[id].tsx`)

### Seções Renderizadas

1. **Header com Navegação de Retorno**:
   - Botão de voltar: `AccessiblePressable` com ícone `arrow-left`, dimensões mínimas de 48x48dp.
   - Ação de retorno: `router.back()` com fallback para `/derivados`.
   - Título da tela e Badge com a categoria/destaque (`Patrimônio Cultural`, `Alto Valor Agregado`, etc.).
2. **Card de Visão Geral & Métricas Chave**:
   - Ícone do derivado.
   - Descrição introdutória.
   - Pílulas com: *Tempo Estimado*, *Dificuldade* e *Parte do Fruto Aproveitada*.
3. **Card de Aproveitamento & Rendimento Econômico**:
   - Proporção de matéria-prima necessária.
   - Taxa de conversão em produto final.
   - Subprodutos secundários gerados para aproveitamento integral (zero desperdício).
4. **Card de Equipamentos & Insumos**:
   - Lista clara em badges dos materiais e utensílios necessários.
5. **Passo a Passo de Processamento**:
   - Lista sequencial de etapas (`passos`).
   - Cada etapa exibe: Círculo com o número do passo, título em destaque, descrição detalhada e caixa de dica prática de campo (quando disponível).
6. **Card de Boas Práticas & Segurança Rural**:
   - Lista com marcadores verdes de normas de higiene alimentar.
   - Caixa de atenção em amarelo/âmbar para riscos específicos (ex.: manuseio do LCC ou banho-maria).

---

## 4. Contrato de Integração com o Catálogo (`app/(tabs)/derivados/index.tsx`)

Na tela de listagem de derivados (`app/(tabs)/derivados/index.tsx`), cada card deve atualizar a ação `onPress` do `AccessiblePressable`:

```typescript
// Antes:
// onPress={() => {}}

// Contrato Atualizado:
onPress={() => {
  router.push(`/(tabs)/derivados/${item.id}`);
}}
```

---

## 5. Garantias Constitucionais e Acessibilidade

- **Hitbox Mínima**: Qualquer elemento interativo (botão de retorno, links) deve ter tamanho visual/área de toque >= 48x48dp (`AccessiblePressable`).
- **Estado Vazio Sem Quebra**: Se `getDerivadoById(id)` retornar `undefined`, renderiza `<EmptyState title="Derivado não encontrado" ... />` sem tela branca.
- **Responsividade Universal**: Largura máxima de 800px centralizada para Web e margens de 16px fluidas para Android.
