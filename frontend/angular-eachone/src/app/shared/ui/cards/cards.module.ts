import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtraLargeCardComponent } from './extra-large-card/extra-large-card.component';
import { LargeCardComponent } from './large-card/large-card.component';
import { MediumCardComponent } from './medium-card/medium-card.component';
import { SmallCardComponent } from './small-card/small-card.component';



@NgModule({
  declarations: [
    ExtraLargeCardComponent,
    LargeCardComponent,
    MediumCardComponent,
    SmallCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ExtraLargeCardComponent,
    LargeCardComponent,
    MediumCardComponent,
    SmallCardComponent
  ]
})
export class CardsModule { }
