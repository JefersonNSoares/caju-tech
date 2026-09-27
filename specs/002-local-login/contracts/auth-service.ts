/**
 * Contrato de serviço para armazenamento e persistência local da autenticação do CajuTech.
 * @module specs/002-local-login/contracts/auth-service
 */

import { UserProfile, UserRole } from '../../../types/user';

export interface CreateProfileDTO {
  role: UserRole;
  displayName?: string;
  preferredCity?: string;
}

export interface IAuthStorageService {
  /**
   * Obtém o perfil de usuário atualmente salvo no dispositivo.
   * Retorna null se não houver perfil salvo ou se os dados estiverem corrompidos.
   */
  getProfile(): Promise<UserProfile | null>;

  /**
   * Salva ou sobrescreve o perfil de usuário ativo no dispositivo.
   * Aplica regras de sanitização de nome e valores padrão.
   */
  saveProfile(dto: CreateProfileDTO): Promise<UserProfile>;

  /**
   * Remove completamente o perfil e o estado da sessão do dispositivo.
   * Utilizado na ação de "Sair / Redefinir".
   */
  clearProfile(): Promise<void>;

  /**
   * Verifica rapidamente se há uma sessão autenticada ativa no dispositivo.
   */
  hasActiveSession(): Promise<boolean>;
}
