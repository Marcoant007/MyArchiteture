import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-languages-select',
  templateUrl: './languages-select.component.html',
  styleUrls: ['./languages-select.component.scss']
})
export class LanguagesSelectComponent implements OnInit {

  languageSelect = new EventEmitter

  @Input()
  countryList = [];

  @Input()
  countryActive = [];

  @Input()
  disabled: boolean;

  @Output()
  selectLanguageEmiter = new EventEmitter()

  constructor() { }

  ngOnInit(): void { }

  selectLanguage(language: object) {
    this.selectLanguageEmiter.emit(language);
  }
}
