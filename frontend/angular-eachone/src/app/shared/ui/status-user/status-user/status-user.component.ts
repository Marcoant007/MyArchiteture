import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-user',
  templateUrl: './status-user.component.html',
  styleUrls: ['./status-user.component.scss']
})
export class StatusUserComponent implements OnInit {

  @Input()
  statusText: string;

  @Input()
  class: string;

  @Input()
  disabled: boolean;

  @Input()
  blocked: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
