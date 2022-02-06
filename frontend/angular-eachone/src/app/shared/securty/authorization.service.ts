import { Injectable } from '@angular/core';

import { ProfileService } from '../services/profile.service';

/**
 * Classe responsável por gerenciar a autorização a um determinado recurso do sistema.
 * @author Etaure TI & Automação
 */
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private profileService: ProfileService) { }

  /**
   * Verifica se o usuário tem determinada permissão no sistema.
   * Retorna true se o usuário tiver a permissão requisitada e false caso contrário.
   */
  isAllowed(permission?: string): boolean {
    if (!permission) {
      return true;
    }

    return this.profileService.checkPermission(permission);
  }

  /**
   * Verifica se o usuário tem determinada permissão no sistema.
   * Retorna true se o usuário não tiver a permissão requisitada e false caso contrário.
   */
  notAllowed(permission: string): boolean {
    return !this.isAllowed(permission);
  }
}

