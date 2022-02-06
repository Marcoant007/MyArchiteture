import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-area',
  templateUrl: './button-area.component.html',
  styleUrls: ['./button-area.component.scss']
})
export class ButtonAreaComponent implements OnInit {

  @Input()
  isConfirm: boolean

  @Input()
  isCancel: boolean

  constructor() { }

  ngOnInit(): void {
  }

}
