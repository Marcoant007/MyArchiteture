import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-limit-scale',
  templateUrl: './limit-scale.component.html',
  styleUrls: ['./limit-scale.component.scss']
})
export class LimitScaleComponent implements OnInit {

  @Input()
  id: number;

  @Input()
  title: string;

  @Input()
  description: string;

  @Input()
  upperLimit: number;

  @Input()
  lowerLimit: number;

  @Input()
  backgroundColor: string;

  @Input()
  showIconDelete: boolean = false;

  @Output()
  onClick = new EventEmitter();

  @Output()
  onDelete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  onClicked() {
    this.onClick.emit(this.id);
  }

  onDeleted() {
    this.onDelete.emit(this.id);
  }

}
