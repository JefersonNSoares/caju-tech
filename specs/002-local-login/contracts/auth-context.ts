/**
 * Contrato de contexto de autenticação React para o CajuTech.
 * @module specs/002-local-login/contracts/auth-context
 */

import { UserProfile, UserRole } from '../../../types/user';

export interface AuthContextValue {
  /** Perfil do usuário atualmente ativo, ou null se não autenticado */
  user: UserProfile | null;

  /** Indicador de carregamento inicial (lendo storage durante a splash) */
  isLoading: boolean;

  /** Booleano indicando se há um usuário ativo autenticado */
  isAuthenticated: boolean;

  /**
   * Realiza a identificação do usuário, gravando no storage e atualizando o estado reativo.
   */
  login: (role: UserRole, displayName?: string) => Promise<void>;

  /**
   * Limpa os dados locais do dispositivo e desconecta o usuário.
   */
  logout: () => Promise<void>;

  /**
   * Altera diretamente o papel do perfil atual, mantendo o nome ou atualizando-o.
   */
  switchRole: (newRole: UserRole, newDisplayName?: string) => Promise<void>;
}
