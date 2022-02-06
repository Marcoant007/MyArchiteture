import { Directive, Component, OnInit, Input, forwardRef, HostBinding, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true,
};

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [CUSTOM_VALUE_ACCESSOR],
  styleUrls: ['./checkbox.component.scss']
})

export class CheckboxComponent implements OnInit, ControlValueAccessor {
  @Input('label')
  label: string;

  @Input()
  editable: boolean = true;

  @Input()
  customClass: any;

  @Input()
  checked: boolean = false;

  @Input()
  tooltip: string;

  @Input()
  customLabel: string;

  @Input() disabled = false;
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.60 : 1;
  }

  @Output()
  onClick: EventEmitter<any> = new EventEmitter();

  get value(): boolean {
    return this.checked;
  }

  get desabilitado() {
    return this.disabled || !this.editable
  }

  constructor() { }

  ngOnInit() {

  }

  // Function to call when the rating changes.
  onChange = (value: boolean) => { this.checked = value };

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => { };

  onChecked(e) {
    this.checked = !this.checked;
    this.writeValue(this.checked);
    this.onClick.emit(this.checked);
  }

  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  writeValue(value: boolean): void {
    this.checked = value;
    this.onChange(value)
  }

  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
