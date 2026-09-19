# Common Components Contract (Princípio II - Hitbox >= 48x48dp)

Este contrato define a interface e os requisitos arquiteturais dos componentes interativos base em `components/common/`.

---

## 1. AccessiblePressable (`components/common/AccessiblePressable.tsx`)

Wrapper fundamental para qualquer elemento clicável ou tocável na aplicação.

### Props Interface
```typescript
import { PressableProps, StyleProp, ViewStyle } from 'react-native';

export interface AccessiblePressableProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  minTouchSize?: number;         // Default: 48 (garantido por tipo e runtime)
  children: React.ReactNode;
  testID?: string;
}
```

### Garantia Arquitetural
- Todo `AccessiblePressable` aplica automaticamente `minHeight: 48` e `minWidth: 48` no seu container, mesmo que estilos externos tentem sobrescrever com valores menores.
- Deve fornecer feedback de opacidade ou efeito visual tátil de clique.

---

## 2. Button (`components/common/Button.tsx`)

Botão padrão CajuTech com identidade visual rural e acessibilidade.

### Props Interface
```typescript
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;       // Default: 'primary' (Verde Cajueiro)
  size?: ButtonSize;             // Default: 'md' (altura >= 48dp)
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  testID?: string;
}
```

### Comportamento e Dimensões
- Altura mínima:
  - `sm`: 48dp (com padding interno compacto, mas hitbox sempre preservada)
  - `md`: 48dp
  - `lg`: 56dp
- Estados visuais: Normal, Pressionado, Desabilitado (`opacity: 0.6`), Carregando (Spinner embutido).
- Paleta:
  - `primary`: Fundo `#1B5E20`, texto branco.
  - `secondary`: Fundo `#FBC02D` ou `#F57C00`, texto escuro.
  - `outline`: Borda `#1B5E20`, fundo transparente, texto `#1B5E20`.
