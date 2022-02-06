import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-switch-list',
  templateUrl: './switch-list.component.html',
  styleUrls: ['./switch-list.component.scss']
})
export class SwitchListComponent implements OnInit {

  @Input()
  switchs: any[] = [];

  @Output() newLanguageEvent = new EventEmitter<string>();

  formGroup: FormGroup

  constructor(
  ) { }

  ngOnInit(): void {
  }


  languageHandler(el: any) {
    el.enable = !el.enable;
    this.newLanguageEvent.emit(el)
  }

  returnLanguage(name: string) {
    if (name === 'PT-BR') {
      return 'Português'
    }

    if (name === 'EN-US') {
      return 'Inglês'
    }

    if (name === 'ES-ES') {
      return 'Espanhol'
    }
  }

}
