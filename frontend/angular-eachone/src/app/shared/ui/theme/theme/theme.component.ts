import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackgroundService } from 'src/app/shared/services/background.service';
@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  @Output()
  darkTheme: boolean = false;

constructor(
  private BackgroundService: BackgroundService
) { }

public subs: Subscription;

  ngOnInit(): void {
    this.subs = this.BackgroundService.getObservable().subscribe( isDashboard => {
      this.reverseSing()
    });
  }



  themeChange() {
    this.darkTheme = !this.darkTheme

    if (this.darkTheme) {
      document.documentElement.style.setProperty('--background-color', '#f4f7fc');
      document.documentElement.style.setProperty('--menu-background-color', '#ffff');
      document.documentElement.style.setProperty('--background-color-2', '#ffff');
      document.documentElement.style.setProperty('--font-color', '#000');
      document.documentElement.style.setProperty('--title-color', '#000');
      document.documentElement.style.setProperty('--font-header-color', '#000');
      document.documentElement.style.setProperty('--sidemenu-text-color', '#fff');
      document.documentElement.style.setProperty('--separating-edge-color', '#f0f0f0');
      document.documentElement.style.setProperty('--droptools-background', '#ced6e5');
      document.documentElement.style.setProperty('--border-view-button', '#3a3f6125');
      document.documentElement.style.setProperty('--text-white-to-gray', '#7e84a3');
      document.documentElement.style.setProperty('--calendar-background', '#fff');
      document.documentElement.style.setProperty('--period-background', '#cacede');
      document.documentElement.style.setProperty('--background-gray-1-to-white', '#fff')
      document.documentElement.style.setProperty('--cards-background', '#f0f0f0');
      document.documentElement.style.setProperty('--icon-color-menu', '#fff');
      document.documentElement.style.setProperty('--text-background-color-to-gray-1', '#475365');
      document.documentElement.style.setProperty('--drown-model-background-color', '#0059ff2d');
      document.documentElement.style.setProperty('--sidemenu-icon', '#808080');
      document.documentElement.style.setProperty('--white-text', '#fff');
      document.documentElement.style.setProperty('--drop-menu-profile', '#ced6e5');
      document.documentElement.style.setProperty('--anchor-button-background', '#f1f1f1');
      document.documentElement.style.setProperty('--anchor-button-text', '#000');
      document.documentElement.style.setProperty('--text-white-inline', '#0057F9')
      document.documentElement.style.setProperty('--inlineInputColor', '#7E84A4')
      document.documentElement.style.setProperty('--snackBarError', '#ffbcbc69')
      document.documentElement.style.setProperty('--background-main-snackbar-confirm', '#f1f1f1eb')
      document.documentElement.style.setProperty('--hover-color', '#b6b7bd')
      document.documentElement.style.setProperty('--dividr-color', '#2c2c2c')
      document.documentElement.style.setProperty('--label-color', '#7e84a4')
    }

    if (!this.darkTheme) {
      document.documentElement.style.setProperty('--background-color', '#2b2c3a');
      document.documentElement.style.setProperty('--menu-background-color', '#333442');
      document.documentElement.style.setProperty('--background-color-2', '#333442');
      document.documentElement.style.setProperty('--font-color', '#f3f3f5');
      document.documentElement.style.setProperty('--title-color', '#fff');
      document.documentElement.style.setProperty('--font-header-color', '#7e84a3');
      document.documentElement.style.setProperty('--sidemenu-text-color', '#0000');
      document.documentElement.style.setProperty('--separating-edge-color', '#0000');
      document.documentElement.style.setProperty('--droptools-background', '#272835');
      document.documentElement.style.setProperty('--border-view-button', '#3a3f6125');
      document.documentElement.style.setProperty('--text-white-to-gray', '#fff');
      document.documentElement.style.setProperty('--calendar-background', '#475365');
      document.documentElement.style.setProperty('--period-background', '#3B4555');
      document.documentElement.style.setProperty('--background-gray-1-to-white', '#475365');
      document.documentElement.style.setProperty('--cards-background', '#333442');
      document.documentElement.style.setProperty('--icon-color-menu', '#7D84A2');
      document.documentElement.style.setProperty('--text-background-color-to-gray-1', '#2b2c3a');
      document.documentElement.style.setProperty('--drown-model-background-color', '#2a3554');
      document.documentElement.style.setProperty('--sidemenu-icon', '#fff');
      document.documentElement.style.setProperty('--white-text', '#fff');
      document.documentElement.style.setProperty('--drop-menu-profile', '#272835');
      document.documentElement.style.setProperty('--anchor-button-background', '#303c58');
      document.documentElement.style.setProperty('--anchor-button-text', '#0057F9');
      document.documentElement.style.setProperty('--text-white-inline', '#fff')
      document.documentElement.style.setProperty('--inlineInputColor', '#eeeeee')
      document.documentElement.style.setProperty('--snackBarError', '#482c3c')
      document.documentElement.style.setProperty('--background-main-snackbar-confirm', '#2f3141e8')
      document.documentElement.style.setProperty('--hover-color', '#5a607f')
      document.documentElement.style.setProperty('--dividr-color', '#fff')
      document.documentElement.style.setProperty('--label-color', '#686d88')
    }

    this.BackgroundService.handle();
  }

  reverseSing(){
  }
}


