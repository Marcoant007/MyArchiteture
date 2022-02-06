import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from './ui/ui.module';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from './directives/directives.module';
import { SecurityModule } from './securty/security.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    UiModule,
    DirectivesModule,
    SecurityModule,
  ],
  exports: [
    UiModule,
    DirectivesModule,
    SecurityModule,
  ]
})
export class SharedModule { }
