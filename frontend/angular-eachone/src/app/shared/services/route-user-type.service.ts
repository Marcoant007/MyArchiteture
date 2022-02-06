import { Injectable } from '@angular/core';
import { MenuBuilderService } from './menu-builder.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class RouteUserTypeService {

  constructor(
    private profileService: ProfileService
  ) { }

  getRouteFromUserType() {
    const profile = this.profileService.get();

    if (profile.userType == 'Administrador') {
      return 'dashboard';
    }

    if (profile.userType == 'Administrador_Instituicional') {
      return 'dashboard';
    }

    if (profile.userType == 'Coordenador') {
      return 'dashboard';
    }

    if (profile.userType == 'Aluno') {
      return `dashboard`;
    }

    if (profile.userType == 'Professor') {
      return `dashboard`;
    }
  }
}
