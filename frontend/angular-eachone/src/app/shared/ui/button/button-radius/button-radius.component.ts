import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-radius',
  templateUrl: './button-radius.component.html',
  styleUrls: ['./button-radius.component.scss']
})
export class ButtonRadiusComponent implements OnInit {
  @Input()
  isView: boolean = false;
  @Input()
  isDelete: boolean = false;
  @Input()
  isEdit: boolean = false;
  @Input()
  disable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
