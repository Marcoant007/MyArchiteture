import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';
import { SessionService } from '../services/session.service';

/**
 * Guarda utilizada para verificar se um usuário está autenticado no sistema ou não.
 * @author silas.moraes
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivateChild {

  constructor(
    private router: Router,
    private sessionService: SessionService,
  ) {

  }

  /**
   * Método que define se a rota solicitada pode ser ativada ou não.
   * Retorna true se for o usuário estiver autenticado e false caso contrário.
   */
  canActivateChild(): boolean {
    if (this.sessionService.hasItem('profile')) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }


}
