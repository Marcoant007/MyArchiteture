import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/acesso/services/language.service';

@Component({
  selector: 'app-language-setting',
  templateUrl: './language-setting.component.html',
  styleUrls: ['./language-setting.component.scss']
})
export class LanguageSettingComponent implements OnInit {

  public listLanguages: any[];

  constructor(
    private languageService: LanguageService
  ) { }

  breadcrumb = [{
    name: 'Idiomas',
    route: 'languageSetting',
    permition: 'any'
  }]

  switchs = [{
    name: 'Português',
    enable: true,
    id: 'PT-BR'
  }, {
    name: 'Inglês',
    enable: true,
    id: 'EN-US'
  }, {
    name: 'Espanhol',
    enable: true,
    id: 'ES-ES'
  }]

  async ngOnInit() {
    await this.loadLanguages()
  }

  async loadLanguages() {
    this.listLanguages = await this.languageService.find();
  }

  async changeStatusLanguage(language: any) {
    let id = language.id;
    let status = language.enable;
    await this.languageService.changeStatus(id, status);
  }
}
