import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpCenterComponent } from './help-center/help-center.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [HelpCenterComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[HelpCenterComponent]
})
export class HelpCenterModule { }
