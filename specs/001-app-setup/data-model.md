# Phase 1: Data Model & Types - Universal App Setup

**Feature**: CajuTech Universal App Setup  
**Branch**: `001-app-setup`  
**Date**: 2026-09-19  

## 1. Entities & Core Types

### 1.1 Theme & Design System (`types/theme.ts`)

Define os tokens de design com garantia de hitboxes mínimas e paleta de cores rural inspirada na cajucultura.

```typescript
export interface ColorTokens {
  // Cores Rurais Principais
  primary: string;         // Verde Cajueiro (#1B5E20)
  primaryLight: string;    // Verde Folha Jovem (#4CAF50)
  primaryDark: string;     // Verde Mata Fechada (#0E3A13)
  
  // Cores do Fruto e Pedúnculo
  cajuYellow: string;      // Amarelo Pedúnculo Maduro (#FBC02D)
  cajuOrange: string;      // Laranja Caju (#F57C00)
  cajuRed: string;         // Vermelho Caju Doce (#D32F2F)
  
  // Tons Terrosos e Neutros
  earthBrown: string;      // Marrom Solo / Castanha (#5D4037)
  earthLight: string;      // Areia do Semiárido (#F5F0E6)
  
  // Superfícies e Textos
  background: string;      // Branco/Off-white suave (#F9FBF7)
  surface: string;         // Branco Puro (#FFFFFF)
  surfaceCard: string;     // Fundo de Card (#FFFFFF)
  textPrimary: string;     // Cinza Escuro Alto Contraste (#1F2937)
  textSecondary: string;   // Cinza Médio (#4B5563)
  textMuted: string;       // Cinza Claro (#9CA3AF)
  
  // Estados do Sistema
  success: string;         // Verde Sucesso (#2E7D32)
  warning: string;         // Alerta Colheita (#EF6C00)
  error: string;           // Falha Temporária (#C62828)
  offline: string;         // Sinal Ausente (#616161)
}

export interface DimensionTokens {
  minTouchTarget: 48;      // Hitbox mínima obrigatória (Princípio II)
  spacing: {
    xs: 4;
    sm: 8;
    md: 16;
    lg: 24;
    xl: 32;
    xxl: 48;
  };
  radius: {
    sm: 4;
    md: 8;
    lg: 12;
    xl: 16;
    full: 9999;
  };
}

export interface ThemeConfig {
  colors: ColorTokens;
  dimensions: DimensionTokens;
}
```

---

### 1.2 Network Status Model (`types/network.ts`)

Representa o estado de conectividade atualizado de forma síncrona/reativa em ambas as plataformas (Web e Android).

```typescript
export type ConnectionType = 'wifi' | 'cellular' | 'ethernet' | 'unknown' | 'none';

export interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  isOffline: boolean;
  connectionType: ConnectionType;
  lastCheckedAt: number; // timestamp
}
```

---

### 1.3 Async Feedback State Model (`types/state.ts`)

Padroniza o tratamento de estados das telas para cumprimento do **Princípio I (Zero Telas em Branco)** e **Princípio V (Isolamento de Falhas)**.

```typescript
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'empty' | 'offline' | 'error';

export interface AsyncState<T> {
  status: AsyncStatus;
  data: T | null;
  error: string | null;           // Mensagem amigável rural (ex: "Instabilidade temporária")
  canRetry: boolean;
  lastUpdated?: number;
}
```

---

### 1.4 Navigation & App Profile Model (`types/navigation.ts`, `types/user.ts`)

Estrutura de rotas e perfis de usuário conforme a Constituição.

```typescript
export type UserRole = 'farmer' | 'student' | 'visitor';

export interface UserProfile {
  id: string;
  role: UserRole;
  displayName: string;
  preferredCity?: string; // Default: 'Piripiri-PI'
}

export type RootTabRoute = 'index' | 'cultivo' | 'derivados' | 'sustentabilidade' | 'recursos';

export interface TabRouteConfig {
  name: RootTabRoute;
  title: string;           // Ex: 'Cultivo', 'Derivados', 'Sustentabilidade', 'Recursos'
  iconName: string;
  badgeCount?: number;
}
```

---

## 2. Validation & State Transitions

1. **Hitbox Validation**:
   - Todo componente derivado de `Pressable` ou `TouchableOpacity` deve garantir `minHeight: 48` e `minWidth: 48`.
2. **Network State Transition**:
   - `isConnected === false` ativa imediatamente `isOffline = true`.
   - Se `isOffline === true`, telas devem renderizar dados em cache local ou alternar para estado `offline` com `OfflineBanner`.
3. **Async State Transitions**:
   - `idle` → `loading` (Skeleton exibido em < 400ms) → `success` | `empty` | `error` | `offline`.
   - Ao acionar "Tentar novamente" em `error`, transição direta para `loading` apenas da requisição afetada.
