import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuBuilderService {

  private menu: any[];

  constructor() { }

  buildMenuAdministrator() {
    let menu = [];
    menu.push({ name: 'Dashboard', route: '/dashboard', icon: 'fas fa-chart-line', permission: ['dashboard-menu'] });
    menu.push({ name: 'Usuários', route: '/users', icon: 'fas fa-users', permission: ['users-menu'] });
    menu.push({ name: 'Instituições', route: '/institutions', icon: 'fas fa-home', permission: ['organization-menu'] });
    menu.push({ name: 'Planos', route: '/plan', icon: 'fas fa-sticky-note', permission: '' });
    menu.push({ name: 'Idiomas', route: '/languageSetting', icon: 'fas fa-globe', permission: '' });
    menu.push({ name: 'Central de Ajuda', route: '/helpCenter', icon: 'far fa-question-circle', permission: '' });

    this.menu = menu;
  }

  buildMenuCoordenador() {
    let menu = [];
    menu.push({ name: 'Dashboard', route: '/dashboard', icon: 'fas fa-chart-line', permission: ['dashboard-menu'] });
    menu.push({ name: 'Usuários', route: '/users', icon: 'fas fa-users', permission: ['users-menu'] });
    menu.push({ name: 'Instituições', route: '/institutions', icon: 'fas fa-home', permission: ['organization-menu'] });
    menu.push({ name: 'Cobranças', route: '/charge', icon: 'fas fa-sticky-note', permission: '' });
    menu.push({ name: 'Automações', route: 'a', icon: 'fas fa-power-off', permission: '' });
    menu.push({ name: 'Calendário', route: 'a', icon: 'far fa-calendar', permission: '' });
    menu.push({ name: 'Central de Ajuda', route: '/helpCenter', icon: 'far fa-question-circle', permission: '' });

    this.menu = menu;

  }

  buildMenuAdministratorInstitution() {
    let menu = [];
    menu.push({ name: 'Dashboard', route: '/dashboard', icon: 'fas fa-chart-line', permission: ['dashboard-menu'] });
    menu.push({ name: 'Usuários', route: '/users', icon: 'fas fa-users', permission: ['users-menu'] });
    menu.push({ name: 'Instituições', route: '/institutions', icon: 'fas fa-home', permission: ['organization-menu'] });
    menu.push({ name: 'Central de Ajuda', route: '/helpCenter', icon: 'far fa-question-circle', permission: '' });
    menu.push({ name: 'Automações', route: 'a', icon: 'fas fa-power-off', permission: '' });
    menu.push({ name: 'Calendário', route: 'a', icon: 'far fa-calendar', permission: '' });

    this.menu = menu;

  }

  buildMenuStudent() {

  }

  buildMenuTeacher() {
    let menu = [];
    menu.push({ name: 'Dashboard', route: '/dashboard', icon: 'fas fa-chart-line', permission: ['dashboard-menu'] });
    menu.push({ name: 'Cursos', route: 'a', icon: 'fas fa-graduation-cap', permission: ['dashboard-menu'] });
    menu.push({ name: 'Disciplinas', route: '/institutions', icon: 'far fa-file-alt', permission: ['organization-menu'] });
    menu.push({ name: 'Fóruns', route: '/charge', icon: 'fas fa-comments', permission: '' });
    menu.push({ name: 'Avaliações', route: 'a', icon: 'fas fa-pencil-alt', permission: '' });
    menu.push({ name: 'Alunos', route: '/users', icon: 'fas fa-users', permission: ['users-menu'] });
    menu.push({ name: 'Automações', route: 'a', icon: 'fas fa-power-off', permission: '' });
    menu.push({ name: 'Calendário', route: 'a', icon: 'far fa-calendar', permission: '' });
    menu.push({ name: 'Central de Ajuda', route: '/helpCenter', icon: 'far fa-question-circle', permission: '' });

    this.menu = menu;

  }

  getMenu(typeMenu: string) {
    if (typeMenu === 'Administrador') {
      this.buildMenuAdministrator();
    }

    if (typeMenu === 'Administrador_Instituicional') {
      console.log("Entrei")
      this.buildMenuAdministratorInstitution();
    }

    if (typeMenu === 'Coordenador') {
      this.buildMenuCoordenador();
    }

    if (typeMenu === 'Professor') {
      this.buildMenuTeacher();
    }

    if (typeMenu === 'Aluno') {
      this.buildMenuStudent();
    }

    return this.menu;
  }
}
