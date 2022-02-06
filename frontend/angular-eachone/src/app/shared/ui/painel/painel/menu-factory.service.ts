import { Injectable } from '@angular/core';
import { ProfileModel } from 'src/app/shared/models/profile.model';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { MenuItem } from './menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuFactory {

  private profile: ProfileModel;
  private baseUrl: string;

  constructor(
    private profileService: ProfileService
  ) {
    this.reloadProfileData();
  }

  reloadProfileData() {
    this.profile = this.profileService.get();
    if (!this.profile) {
      return;
    }
  }

  factoryAdministratorMenu(): MenuItem[] {
    let menus: MenuItem[] = [];
    menus.push(new MenuItem({ name: 'Dashboard', permissions: ['panel-menu'], icon: 'fa-chart-line', link: "dashboard", active: true }));
    menus.push(new MenuItem({ name: 'Instituições', permissions: ['organization-menu'], icon: 'fa-briefcase', link: "empresas", active: false }));
    menus.push(new MenuItem({ name: 'Usuários', permissions: ['clinic-menu'], icon: 'fa-briefcase', link: `empresas/${this.profile.organization?.id}/clinicas/`, active: false }));
    menus.push(new MenuItem({ name: 'Planos', permissions: ['unit-menu'], icon: 'fa-briefcase', link: `empresas/${this.profile.organization?.id}/clinicas/${this.profile.selectedClinic?.id}/unidades`, active: false }));
    menus.push(new MenuItem({ name: 'Idiomas', permissions: ['schedule-menu'], icon: 'fa-calendar-alt', link: "agenda", active: false }));
    menus.push(new MenuItem({ name: 'Central de ajuda', permissions: ['patient-menu'], icon: 'fa-procedures', link: `empresas/${this.profile.organization?.id}/clinicas/${this.profile.selectedClinic?.id}/pacientes`, active: false }));
    return menus;
  }

  getInstituitionAdmistratorMenu(): MenuItem[] {
    let menus: MenuItem[] = [];
    return menus;
  }

  getTeacherMenu(): MenuItem[] {
    let menus: MenuItem[] = [];
    return menus;
  }

  getStudentMen(): MenuItem[] {
    let menus: MenuItem[] = [];
    return menus;
  }

}
