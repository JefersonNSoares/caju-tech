export const STORAGE_KEYS = {
  USER_PROFILE: '@cajutech:user_profile',
  AUTH_SESSION: '@cajutech:auth_session',
} as const;

export const DEFAULT_USER_CONFIG = {
  PREFERRED_CITY: 'Piripiri - PI',
  ROLE_NAMES: {
    farmer: 'Produtor Rural',
    student: 'Estudante',
    visitor: 'Visitante',
  },
} as const;
