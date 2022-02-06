import { Component, OnInit, Input, Output, forwardRef, HostBinding, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';

const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputSearchComponent),
  multi: true,
};

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  // providers: [CUSTOM_VALUE_ACCESSOR],
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {

  @Input()
  public label: string;

  @Input()
  public type: string = 'text';

  @Input()
  public txValue: string;

  @Input()
  public inline: boolean;

  @Input()
  private valueInput: string;

  @Input()
  public mask: string;

  @Input()
  public showMask: boolean = false;

  @Input()
  public maskPattern: any;

  @Input()
  public formControl: FormControl;

  @Output()
  public onBlur: EventEmitter<any> = new EventEmitter();

  @Input()
  tooltip: string;

  @Input()
  placeholder: string;

  @Input()
  showRequired: boolean = true;

  @Input()
  icon: string;

  @Input()
  iconDensity: string;

  @Input()
  pattern: string;

  @Input()
  class: string;

  isLoading = false;

  canSearch = true;

  @Input()
  service: any;

  @Input()
  nameFunctionSearch: string;

  searchList: any[] = [];

  transferValue = new Subject<string>()

  @Output()
  public itemSelected: EventEmitter<any> = new EventEmitter();

  @Output()
  public keyDown: EventEmitter<any> = new EventEmitter();

  @Output()
  public enterPressed: EventEmitter<any> = new EventEmitter();

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
  ngOnInit(): void {
    this.transferValue.asObservable()
      .pipe(
        debounceTime(500),
        tap(() => { this.isLoading = true, this.canSearch = true }),
        switchMap(value => this.service[this.nameFunctionSearch](value, false) //true para desabilitar o loading default no service
          .pipe(
            finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(data => this.searchList = <any>data);
  }

  handleSelectedItem(item: any) {
    this.searchList = [];
    this.canSearch = false;
    this.txValue = item.name;
    this.itemSelected.emit(item);
  }

  // Function to call when the rating changes.
  onChange = (value: string) => {
    this.txValue = value;
    if (value) {
      this.transferValue.next(value);
    } else {
      this.searchList = [];
    }
  };

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {
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
    setTimeout(() => {
      this.outFocus = true;
      this.onFocus = false;
    }, 200);
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

  handlekeyDown(key) {
    if(key.key == 'Enter'){
      console.log(this.value)
      // this.enterPressed = this.txValue
    }
    this.keyDown.emit(key)
  }
}
