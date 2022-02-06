import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {

  @Input()
  atributeValue: string = 'id';

  @Input()
  textSelect: string = 'name';

  @Input()
  datalabel: string;

  @Input()
  customDefaultLabel: string = "#ff0000";

  @Input()
  label: string;

  @Input()
  inline: boolean;

  @Input()
  tooltip: boolean;

  @Input()
  showRequired: boolean = true;

  outFocus: boolean;
  onFocus: boolean;

  @Input()
  requirementMessage: string = "Este é campo obrigatório";

  @Input()
  class: string;

  public formControl: FormControl;

  public selected: any = null;


  @Input()
  set formControlRequirements(control: any) {
    this.formControl = control;
  };

  constructor() { }

  ngOnInit(): void {
    
  }

  get hasDropDownError() {
    if (this.formControl) {
      return (
        this.formControl.touched &&
        this.formControl.errors &&
        this.formControl.errors.required
      )
    } else {
      return this.outFocus && this.selected == null;
    }
  }

  focus() {
    this.outFocus = false;
    this.onFocus = true;
  }

  focusout() {
    this.outFocus = true;
    this.onFocus = false;
  }
}
