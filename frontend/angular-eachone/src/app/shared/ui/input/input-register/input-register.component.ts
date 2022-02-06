import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputRegisterComponent),
  multi: true,
};

@Component({
  selector: 'app-input-register',
  templateUrl: './input-register.component.html',
  providers: [CUSTOM_VALUE_ACCESSOR],
  styleUrls: ['./input-register.component.scss']
})
export class InputRegisterComponent implements OnInit {

  @Input()
  innerText: string;

  @Input()
  readOnly: boolean;

  @Input()
  formControl: FormControl;

  @Input()
  requirementMessage: string = "Este campo é obrigatório";

  private wasFocused: boolean = false;
  public onFocus: boolean;
  private outFocus: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  get touched(): boolean {
    if (this.formControl) {
      if (this.wasFocused) {
        return this.formControl.touched && this.outFocus;
      } else {
        return this.formControl.touched
      }
    } else {
      this.outFocus;
    }
  }
}
