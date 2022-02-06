import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input()
  titleSelect: string;

  @Input()
  placeholder: string;

  @Input()
  isInline: Boolean;

  @Input()
  isSimple: Boolean;

  @Input()
  items: any[];

  @Input()
  isDisabled: boolean;

  @Input()
  requirementMessage: string = "Este campo é obrigatório";

  @Input()
  formControl: FormControl

  @Output()
  selectElement = new EventEmitter();

  inputSelect: any;
  activeSelect: Boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit() {
    this.inputSelect = this.document.body.querySelector(".inputSelect");
  }

  clickItem(element: any) {
    let textInput = element;
    if (this.inputSelect.value !== textInput) {
      this.selectElement.emit(textInput);
      this.formControl.setValue(textInput);
    } else {
      this.inputSelect.value = "";
      this.selectElement.emit("");
    }
  }

  controlSelect() {
    if (this.isDisabled) {
      return
    }
    this.activeSelect = !this.activeSelect;
  }
}
