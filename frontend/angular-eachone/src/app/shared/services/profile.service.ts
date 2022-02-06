import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ProfileModel } from './../models/profile.model';
import { SessionService } from './session.service';

/**
 * Classe responsável por gerenciar as requisições básicas para camada de serviço.
 * @author silas.moraes
 */
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profile = new Subject<ProfileModel>();

  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) { }


  /**
   * Método de logout
   * Limpa as variáveis da sessão e redireciona o usuário para tela de login
   * @author laio.zatt
   * @author silas.moraes
   */
  logout() {
    this.sessionService.clear();
    // this.router.navigate(['login']);
    window.location.href = environment.URL_FRONT;
  }

  /**
   * Método para salvar as informações do profile na sessão
   * @author laio.zatt
   * @author silas.moraes
   */
  save(profile: ProfileModel) {
    this.sessionService.setItem('profile', profile);
    this.sendObservableProfile(this.get());
  }

  /**
   * Método para recuperar as informações do usuário da sessão
   * @author laio.zatt
   * @author silas.moraes
   */
  get(): ProfileModel {
    const profile: ProfileModel = this.sessionService.getItem('profile');
    return profile;
  }


  setToken(token: string) {
    const profile: ProfileModel = this.sessionService.getItem('profile');
    profile.token = token;
    this.save(profile);
  }

  // setClinic(clinic: any) {
  //   const profile: ProfileModel = this.sessionService.getItem('profile');
  //   profile.selectedClinic = clinic;
  //   this.save(profile);
  // }

  public checkPermission(...permissions: string[]): boolean {

    const profilePermissions = <any>this.get().permissions;

    if (!profilePermissions) {
      return false;
    }

    let permissionsList = profilePermissions.permissions;

    let canPermission = false;

    permissions.forEach(permission => {
      if (permissionsList.some(profilePermission => profilePermission == permission)) {
        canPermission = true;
      }
    });

    return canPermission;
  }

  sendObservableProfile(profile: ProfileModel) {
    this.profile.next(profile);
  }

  observable() {
    return this.profile.asObservable();
  }
}
