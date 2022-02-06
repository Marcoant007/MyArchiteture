import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { ProfileModel } from 'src/app/shared/models/profile.model';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { SearchService } from 'src/app/shared/services/search.service';
import { ConfirmDialogService } from '../../message/confirm-dialog/confirm-dialog.service';
import { MenuItem } from './menu-item';
import { MenuService } from './menu.service';
import { ClinicExchangeComponent } from './clinic-exchange/clinic-exchange.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements OnInit, OnDestroy {

  public menus_painel: MenuItem[];
  // public menus_config: MenuItem[];
  public menus_user: MenuItem[];

  public permissions: string[];

  public data: Date;

  public profile: ProfileModel;

  currentUrl: any;

  previousUrl: any;

  hideDropdownConfig: boolean = true;

  hideDropdownProfile: boolean = true;

  hideDropdownNav: boolean = true;

  hideDropdownMobile: boolean = true;

  viewNavMenu: boolean = false;

  private profileServiceSubscription: Subscription;

  constructor(
    private menuService: MenuService,
    private profileService: ProfileService,
    private searchService: SearchService,
    public router: Router,
    private confirmDialogService: ConfirmDialogService,
    public dialog: MatDialog
  ) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  ngOnInit(): void {
    this.data = new Date();
    this.menus_painel = this.menuService.adminstratorMenu;
    // this.menus_config = this.menuService.menus_config;
    this.menus_user = this.menuService.adminstratorMenu;
    this.profile = this.profileService.get();
    this.permissions = this.profile.permissions;

    this.profileServiceSubscription = this.profileService.observable().subscribe((profile) => {
      this.profile = profile;
    });
  }

  handleSubmitSearchEmitter(event) {
    event.preventDefault();
    let value: string = event.target[0].value;
    this.searchService.send(value);
  }

  handleBack() {
    this.router.navigateByUrl(this.previousUrl);
  }

  handleLogout() {
    this.confirmDialogService.open({ title: 'Sair', message: 'Deseja mesmo sair do sistema?' });
    this.confirmDialogService.confirmed().subscribe(confimed => {
      if (confimed) {
        this.logout();
      }
    });
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

  handledropdownConfig() {
    this.hideDropdownProfile = true;
    this.hideDropdownNav = true;
    this.hideDropdownConfig = !this.hideDropdownConfig;
  }

  handledropdownProfile() {
    this.hideDropdownConfig = true;
    this.hideDropdownNav = true;
    this.hideDropdownProfile = !this.hideDropdownProfile;
  }

  handledropdownNav() {
    this.hideDropdownConfig = true;
    this.hideDropdownProfile = true;
    this.hideDropdownNav = !this.hideDropdownNav;
  }

  handleViewNavMenu() {
    this.viewNavMenu = !this.viewNavMenu;
    this.hideDropdownMobile = !this.hideDropdownMobile;
  }

  isRouteActive(routeName: string): boolean {
    let [, currentRoute] = this.router.url.split('/');

    if (routeName == currentRoute) {
      return true;
    }

    return false;
  }

  onClick(functionString: string) {
    if (functionString.length !== 0) {
      this[functionString]();
    }
  }

  openClinicExchangeDialog() {
    const dialogRef = this.dialog.open(ClinicExchangeComponent, {
      autoFocus: false,
      maxHeight: '95%',
      panelClass: 'app-modal-clinic-eschange',
    });
  }

  ngOnDestroy(): void {
    this.profileServiceSubscription.unsubscribe();
  }
}
