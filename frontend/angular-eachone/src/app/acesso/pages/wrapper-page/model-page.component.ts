import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileModel } from 'src/app/shared/models/profile.model';
import { MenuBuilderService } from 'src/app/shared/services/menu-builder.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { WrapperService } from 'src/app/shared/services/wrapper.service';


@Component({
  selector: 'app-model-page',
  templateUrl: './model-page.component.html',
  styleUrls: ['./model-page.component.scss']
})
export class ModelPageComponent implements OnInit {

  @Input()
  isDashboardPage: boolean;
  title: string = 'DashBoard'
  sideOpen: boolean = false
  public subs: Subscription;

  logo = "UniFacig"

  menu = [];

  // menu = [{
  //   name: 'Dashboard',
  //   route: '/dashboard',
  //   icon: 'fas fa-chart-line',
  //   permission: ['dashboard-menu']
  // },
  // {
  //   name: 'Usuários',
  //   route: '/users',
  //   icon: 'fas fa-users',
  //   permission: ['users-menu']
  // },
  // {
  //   name: 'Instituições',
  //   route: '/institutions',
  //   icon: 'fas fa-home',
  //   permission: ['organization-menu']
  // },
  // {
  //   name: 'Cobranças',
  //   route: '/charge',
  //   icon: 'fas fa-sticky-note'
  // },
  // // {
  // //   name: 'Automações',
  // //   route: 'a',
  // //   icon: 'fas fa-power-off'
  // // },
  // // {
  // //   name: 'Calendário',
  // //   route: 'a',
  // //   icon: 'far fa-calendar'
  // // },
  // {
  //   name: 'Central de Ajuda',
  //   route: '/helpCenter',
  //   icon: 'far fa-question-circle'
  // }]

  constructor(
    private wrapperService: WrapperService,
    private menuBuilder: MenuBuilderService,
    private profileService: ProfileService
  ) {
    let typeMenu = profileService.get().userType;
    this.menu = this.menuBuilder.getMenu(typeMenu);
  }

  ngOnInit(): void {
    this.subs = this.wrapperService.getObservable().subscribe(isMenuOpen => {
      this.gridHide()
    });
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  gridHide() {
    this.sideOpen = !this.sideOpen
  }
}
