import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropToolsComponent } from './drop-tools/drop-tools.component';

import { DropMenuProfileComponent } from './drop-menu-profile/drop-menu-profile.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [DropToolsComponent, DropMenuProfileComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DropToolsComponent,
    DropMenuProfileComponent,
  ]
})
export class DropMenuModule { }
