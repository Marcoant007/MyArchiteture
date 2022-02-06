import { Component, OnInit, Input, Output, forwardRef, HostBinding, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { CurrencyMaskInputMode } from 'ngx-currency';

const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputCurrencyComponent),
  multi: true,
};

@Component({
  selector: 'app-input-currency',
  templateUrl: './input-currency.component.html',
  providers: [CUSTOM_VALUE_ACCESSOR],
  styleUrls: ['./input-currency.component.scss']
})
export class InputCurrencyComponent implements OnInit {

  @Input()
  public label: string;

  @Input()
  public txValue: string;

  @Input()
  public inline: boolean;

  @Input()
  private valueInput: string;

  @Input()
  public formControl: FormControl;

  @Output()
  public onBlur: EventEmitter<any> = new EventEmitter();

  @Input()
  tooltip: string;

  @Input()
  showRequired: boolean = true;

  @Input()
  icon: string;

  @Input()
  iconDensity: string;

  @Input()
  class: string;

  public ngxCurrencyOptions = {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    allowNegative: false,
    precision: 2,
    nullable: true,
    inputMode: CurrencyMaskInputMode.FINANCIAL,
  };

  @Input()
  requirementMessage: string = "Este campo é obrigatório";
  @Input()
  minLengthMessage: string = "O campo não pode ser muito curto";
  @Input()
  maxLengthMessage: string = "O campo não pode ser muito longo ";
  @Input()
  patternMessage: string = "Formato inválido";
  @Input()
  emailMessage: string = "Email inválido";
  @Input()
  notEquivalentMessage: string = "O campo não está igual";

  private wasFocused: boolean = false;
  public onFocus: boolean;
  private outFocus: boolean;

  // Allow the input to be disabled, and when it is make it somewhat transparent.
  @Input() disabled = false;
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.60 : 1;
  }

  constructor() {
  }

  // Function to call when the rating changes.
  onChange = (value: string) => {
    this.txValue = value
  };

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {
  };

  ngOnInit = () => {
  };

  get value(): string {
    return this.txValue;
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

  click() {
    this.onTouched();
  }

  focus() {
    this.wasFocused = true;
    this.outFocus = false;
    this.onFocus = true;
  }

  focusout() {
    this.outFocus = true;
    this.onFocus = false;
  }

  blur() {
    this.onBlur.emit(this.label)
  }

  onKey(event: any) {
    this.update(event.target.value);
  }

  update(value: string) {
    if (!this.disabled) {
      this.txValue = value;
      this.writeValue(value);
    }
  }

  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  writeValue(value: string): void {
    this.onChange(value)
  }

  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}