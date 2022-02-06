import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown-search',
  templateUrl: './dropdown-search.component.html',
  styleUrls: ['./dropdown-search.component.scss']
})
export class DropdownSearchComponent implements OnInit {
  public hideDisplay: Boolean;

  @Input()
  public titleDropbox: string;

  @Input()
  public formControl: FormControl;

  @Input()
  public listSearch: any[];

  @Output()
  public inputValueEmitter = new EventEmitter();

  @Output()
  public dropdownValueSelect = new EventEmitter();

  inputText: any

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
  }

  ngOnInit(): void {
    this.inputText = this.document.body.querySelector(".input");
  }

  searchUser(event: any) {
    let textInput = event.target.value;
    if (!textInput) {
      this.hideDisplay = false;
    }
    if (textInput) {
      this.hideDisplay = true;
    }
    this.inputValueEmitter.emit(textInput);
  }

  selectItem(element: any) {
    this.inputText.value = element.name;
    this.dropdownValueSelect.emit(element);
    this.hideDisplay = false;
  }
}
