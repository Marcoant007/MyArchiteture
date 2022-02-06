import { Injectable, OnInit } from '@angular/core';
import { MenuFactory } from './menu-factory.service';
import { MenuItem } from './menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public adminstratorMenu: MenuItem[];

  constructor(private menuFactory: MenuFactory) {
    this.adminstratorMenu = this.menuFactory.factoryAdministratorMenu();
  }

}
