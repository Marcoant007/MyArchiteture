import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-attach-area',
  templateUrl: './attach-area.component.html',
  styleUrls: ['./attach-area.component.scss']
})
export class AttachAreaComponent implements OnInit {

  @Input()
  disabled: boolean;

  @Input()
  imgUrl: string = '../../../../../assets/img/avatar.svg';

  @Output()
  clickEvent = new EventEmitter();

  @Output()
  dragDropEvent = new EventEmitter();

  @Input()
  isForEditingUser: boolean = false;

  constructor() { }

  ngOnInit(): void {
    
  }

  attachClick(event) {
    if (this.disabled) {
      return
    }
    this.clickEvent.emit(event);
  }

  attachDropDrag($event) {
    if (this.disabled) {
      return
    }
    this.dragDropEvent.emit($event);
  }
}
