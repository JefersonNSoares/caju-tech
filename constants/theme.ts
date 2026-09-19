import { ThemeConfig } from '../types/theme';

export const THEME: ThemeConfig = {
  colors: {
    primary: '#1B5E20',
    primaryLight: '#4CAF50',
    primaryDark: '#0E3A13',
    cajuYellow: '#FBC02D',
    cajuOrange: '#F57C00',
    cajuRed: '#D32F2F',
    earthBrown: '#5D4037',
    earthLight: '#F5F0E6',
    background: '#F9FBF7',
    surface: '#FFFFFF',
    surfaceCard: '#FFFFFF',
    textPrimary: '#1F2937',
    textSecondary: '#4B5563',
    textMuted: '#9CA3AF',
    success: '#2E7D32',
    warning: '#EF6C00',
    error: '#C62828',
    offline: '#616161',
  },
  dimensions: {
    minTouchTarget: 48,
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },
    radius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      full: 9999,
    },
  },
};
