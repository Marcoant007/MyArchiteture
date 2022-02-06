import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { NgxMaskModule } from 'ngx-mask';
import { TooltipModule } from '../tooltip/tooltip.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputSearchComponent } from './input-search/input-search.component';
import { InputCurrencyComponent } from './input-currency/input-currency.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { InputCheckboxComponent } from './input-checkbox/input-checkbox.component';
import { InputRegisterComponent } from './input-register/input-register.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputComponent, InputSearchComponent, InputCurrencyComponent, InputCheckboxComponent, InputRegisterComponent],
  imports: [
    CommonModule,
    TooltipModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    NgxCurrencyModule,
    FormsModule

  ],
  exports: [
    InputComponent,
    InputSearchComponent,
    InputCurrencyComponent,
    InputCheckboxComponent,
    InputRegisterComponent,

  ]
})
export class InputModule { }
