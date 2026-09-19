# Feedback Components Contract (TEL-EST-01)

Este contrato define as propriedades e o comportamento dos componentes de feedback para atendimento rigoroso ao **Princípio I (Zero Telas em Branco)** e **Princípio V (Isolamento de Falhas)**.

---

## 1. Skeleton Loader (`components/feedback/Skeleton.tsx`)

Usado para indicar carregamento suave em menos de 400ms.

### Props Interface
```typescript
export interface SkeletonProps {
  width?: number | string;       // Default: '100%'
  height?: number;               // Default: 20
  borderRadius?: number;         // Default: 8
  className?: string;
  testID?: string;
}
```

### Comportamento Obrigatório
- Deve renderizar um efeito de pulso suave.
- Tempo de resposta perceptível imediato (< 400ms).
- Compatível universalmente com Android e Web sem travar thread de UI.

---

## 2. EmptyState (`components/feedback/EmptyState.tsx`)

Exibido quando uma listagem ou recurso consultado não possui registros.

### Props Interface
```typescript
export interface EmptyStateProps {
  title: string;                 // Título amigável (ex.: "Nenhum dado encontrado por aqui")
  description?: string;          // Orientação prática para o agricultor/estudante
  actionLabel?: string;          // Rótulo do botão de ação opcional
  onAction?: () => void;         // Callback ao acionar
  iconName?: string;             // Ícone ilustrativo temático
  testID?: string;
}
```

### Comportamento Obrigatório
- Não expor termos técnicos como "Array vazio", "Null", ou "Sem registros no BD".
- O botão de ação (se presente) deve respeitar a hitbox mínima de 48x48dp.

---

## 3. OfflineBanner (`components/feedback/OfflineBanner.tsx`)

Indicador não-intrusivo para alertar perda de sinal rural.

### Props Interface
```typescript
export interface OfflineBannerProps {
  message?: string;              // Default: "Sinal ausente — navegando com dados salvos"
  onRetry?: () => void;          // Opcional: tentar reconectar
  compact?: boolean;             // Modo reduzido para cabeçalhos
  testID?: string;
}
```

### Comportamento Obrigatório
- Fixado na parte superior ou inferior da tela sem sobrepor botões interativos principais.
- Não deve travar o restante da navegação ou impedir leitura de conteúdo em cache.

---

## 4. ErrorCard (`components/feedback/ErrorCard.tsx`)

Card de falha com suporte a retry isolado.

### Props Interface
```typescript
export interface ErrorCardProps {
  title?: string;                // Default: "Instabilidade temporária"
  message?: string;              // Explicação simples (ex: "Não foi possível carregar as cotações.")
  onRetry: () => void;           // Callback do botão "Tentar novamente" (obrigatório)
  retryLabel?: string;           // Default: "Tentar novamente"
  isRetrying?: boolean;          // Indicador de recarregamento no botão
  testID?: string;
}
```

### Comportamento Obrigatório
- **Proibido**: Renderizar códigos `500`, `404`, stack traces ou `JSON.stringify(error)`.
- O botão "Tentar novamente" deve possuir hitbox >= 48x48dp e disparar **apenas** a chamada que falhou, sem reiniciar a tela toda.
