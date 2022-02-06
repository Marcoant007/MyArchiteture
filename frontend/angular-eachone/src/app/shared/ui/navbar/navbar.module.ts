import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { CockpitProfileComponent } from './cockpit-profile/cockpit-profile.component';
import { DropMenuModule } from '../drop-down/drop-menu.module';
import { ThemeModule } from '../theme/theme.module';
import { InputModule } from '../input/input.module';



@NgModule({
  declarations: [NavbarComponent,CockpitProfileComponent],
  imports: [
    CommonModule,
    DropMenuModule,
    ThemeModule,
    DropMenuModule,
    InputModule
  ], exports:[
    NavbarComponent,
    CockpitProfileComponent
  ]
})
export class NavbarModule { }
