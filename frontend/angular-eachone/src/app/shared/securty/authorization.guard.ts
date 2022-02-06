import { Injectable } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthorizationService } from './authorization.service';
import { SessionService } from '../services/session.service';

/**
 * Guarda utilizada para verificar se um usuário tem permissão de utilizar uma tela ou não.
 * @author Etaure TI & Automação
 */
@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivateChild {

  constructor(
    private router: Router,
    private authorizationService: AuthorizationService,
    private sessionService: SessionService,
  ) { }

  /**
   * Método que define se a rota pode ser ativada ou não.
   * Retorna true se o usuário tem a permissão na tela e false caso contrário.
   */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // verificar se o usuário é do tipo SAAS, caso seja passar para próxima etapa, caso
    //  contrário o usuário precisa ter uma organização indicada
    const profile = this.sessionService.getItem('profile');
    if (profile.organizacao === undefined && profile.status.saas === false) {
      this.router.navigate(['login']);
    }
    if (this.authorizationService.isAllowed(route.data['permission'])) {
      return true;
    }
    this.router.navigate(['403']);
    return false;
  }
}
