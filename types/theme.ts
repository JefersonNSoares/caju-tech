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
  background: string;      // Fundo suave (#F9FBF7)
  surface: string;         // Branco Puro (#FFFFFF)
  surfaceCard: string;     // Fundo de Card (#FFFFFF)
  textPrimary: string;     // Cinza Escuro Alto Contraste (#1F2937)
  textSecondary: string;   // Cinza Médio (#4B5563)
  textMuted: string;       // Cinza Claro (#9CA3AF)

  // Estados do Sistema
  success: string;         // Verde Sucesso (#2E7D32)
  warning: string;         // Alerta (#EF6C00)
  error: string;           // Falha Temporária (#C62828)
  offline: string;         // Sinal Ausente (#616161)
}

export interface DimensionTokens {
  minTouchTarget: number; // 48dp (Princípio II da Constituição)
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
}

export interface ThemeConfig {
  colors: ColorTokens;
  dimensions: DimensionTokens;
}
