import { Component, OnInit, Input, Output, forwardRef, HostBinding, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss']
})
export class InputCheckboxComponent implements OnInit {
  // TODO: Dar uma melhorada nisso aqui

  @Input()
  multi: boolean = true;

  @Input()
  formGroup: FormGroup;

  @Input()
  controlName: string;

  @Input()
  label: string;

  @Input()
  description: string;

  @Input()
  data: any;

  @Input()
  atributeValue: string = 'value';

  @Input()
  textValue: string;

  @Input()
  inline: boolean = false;

  @Input()
  disabled: boolean = false;

  @Input()
  class: string;

  @Input()
  required: boolean = false;

  @Input()
  showRequired: boolean = true;

  @Input()
  requirementMessage: string = "Este campo é obrigatório";

  type: string = 'checkbox';

  checked: any;

  array = []

  private wasFocused: boolean = false;
  public onFocus: boolean;
  private outFocus: boolean;

  ngOnInit() {
    if (this.multi == false) {
      this.type = 'radio';
    }

    // this.getChecked()
  }

  // getChecked() {
  //   const control: FormControl = this.formGroup.get(this.controlName) as FormControl;

  //   this.checked = control.value;
  // }

  isChecked(element: any) {
    if (this.checked) {
      if (this.multi == false) {
        return this.checked == element[this.atributeValue];
      }

      return this.checked.includes(element[this.atributeValue]);
    }

    return false;
  }

  changeInputValue(e: any) {
    if (this.type === 'radio') {
      return this.changeRadio(e);
    }

    return this.changeCheckbox(e);
  }

  changeCheckbox(e: any) {
    const control: FormArray = this.formGroup.get(this.controlName) as FormArray;

    if (e.target.checked) {
      this.array.push(e.target.value);
    } else {
      const index = this.array.findIndex(element => element == e.target.value);
      this.array.splice(index, 1);
    }

    control.setValue(this.array);
  }

  changeRadio(e: any) {
    const control: FormControl = this.formGroup.get(this.controlName) as FormControl;

    control.setValue(e.target.value);
  }

  get touched(): boolean {

    if (this.formGroup.get(this.controlName)) {
      if (this.wasFocused) {
        return this.formGroup.get(this.controlName).touched && this.outFocus;
      } else {
        return this.formGroup.get(this.controlName).touched
      }
    } else {
      this.outFocus;
    }
  }
}
