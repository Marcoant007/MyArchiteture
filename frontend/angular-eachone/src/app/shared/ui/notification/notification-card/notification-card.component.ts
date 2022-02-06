import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent implements OnInit {

  @Input()
  title: String
  @Input()
  date: String
  @Input()
  status: number
  @Input()
  unseen: boolean
  @Input()
  index: number
  @Input()
  activeCard: number

  @Output() newItemEvent = new EventEmitter<number>();

  constructor() { }

  selectNotification(id: number){
    this.newItemEvent.emit(id)
  }

  ngOnInit(): void {
  }

}
