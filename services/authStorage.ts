import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, CreateProfileDTO, AuthSession } from '../types/user';
import { STORAGE_KEYS, DEFAULT_USER_CONFIG } from '../constants/storage';

export const authStorageService = {
  /**
   * Obtém o perfil de usuário salvo no dispositivo.
   * Retorna null caso não exista ou caso os dados estejam corrompidos.
   */
  async getProfile(): Promise<UserProfile | null> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (!raw) return null;

      const profile = JSON.parse(raw) as UserProfile;
      if (!profile || !profile.role || !profile.displayName) {
        return null;
      }
      return profile;
    } catch {
      return null;
    }
  },

  /**
   * Salva ou sobrescreve o perfil de usuário ativo no dispositivo (Perfil Único Ativo).
   * Aplica fallback de nome e cidade padrão caso necessário.
   */
  async saveProfile(dto: CreateProfileDTO): Promise<UserProfile> {
    const trimmedName = dto.displayName ? dto.displayName.trim().slice(0, 40) : '';
    const resolvedName = trimmedName || DEFAULT_USER_CONFIG.ROLE_NAMES[dto.role];
    const resolvedCity = dto.preferredCity?.trim() || DEFAULT_USER_CONFIG.PREFERRED_CITY;
    const now = new Date().toISOString();

    const profile: UserProfile = {
      id: `usr_local_${Date.now()}`,
      role: dto.role,
      displayName: resolvedName,
      preferredCity: resolvedCity,
      createdAt: now,
      updatedAt: now,
    };

    const session: AuthSession = {
      isAuthenticated: true,
      activeProfile: profile,
      lastActiveAt: now,
    };

    try {
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile)],
        [STORAGE_KEYS.AUTH_SESSION, JSON.stringify(session)],
      ]);
    } catch (error) {
      console.warn('Aviso: Falha ao persistir dados de autenticação local no AsyncStorage', error);
    }

    return profile;
  },

  /**
   * Remove completamente o perfil e o estado da sessão local (Logout / Sair / Redefinir).
   */
  async clearProfile(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USER_PROFILE,
        STORAGE_KEYS.AUTH_SESSION,
      ]);
    } catch (error) {
      console.warn('Aviso: Falha ao limpar sessão local no AsyncStorage', error);
    }
  },

  /**
   * Verifica se há uma sessão autenticada ativa gravada no dispositivo.
   */
  async hasActiveSession(): Promise<boolean> {
    try {
      const rawSession = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
      if (!rawSession) return false;

      const session = JSON.parse(rawSession) as AuthSession;
      return Boolean(session?.isAuthenticated && session?.activeProfile);
    } catch {
      return false;
    }
  },
};
