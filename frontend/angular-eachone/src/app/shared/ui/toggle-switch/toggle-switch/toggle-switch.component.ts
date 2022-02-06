import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ToggleSwitchComponent),
  multi: true,
};

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  providers: [CUSTOM_VALUE_ACCESSOR],
  styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent implements ControlValueAccessor {

  @Input()
  checked: boolean = false;

  @Input()
  public formControl: FormControl;

  @Output()
  toogleClick = new EventEmitter();

  @Input()
  classLabel: string;

  @Input()
  classSpan: string;

  constructor() { }

  toogleSwitchClick() {
    this.checked = !this.checked;
    this.toogleClick.emit({ checked: this.checked });
  }

  onChange: any = () => { }

  onTouch: any = () => { }

  val = ""

  set value(val) {
    if (val! == undefined && this.val! == val) {
      this.val = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

}
