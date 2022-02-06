import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  hasCalendarOptions: boolean;

  @Input()
  hasAddButton: boolean;

  @Input()
  hasSearch: boolean;

  @Input()
  permission: string;

  @Output()
  clickEvent = new EventEmitter();

  @Input()
  breadcrumb: any[]

  placeHolder = "Pesquisar"
  Mask = 'pesquisa'
  value = ''
  showMask = true


  constructor() { }

  ngOnInit(): void {

  }

  buttonClick() {
    this.clickEvent.emit();
  }

}
