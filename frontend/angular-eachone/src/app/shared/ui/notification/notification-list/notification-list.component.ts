import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  breadcrumb: any[] = [];
  showAllEvents = false;

  constructor() { }

  ngOnInit(): void {
    this.loadBreadcumb();
  }

  loadBreadcumb() {
    this.breadcrumb = [
      {
        name: 'Notificações da empresa',
        route: '',
        permission: '' //TODO: ver se precisa de permissão
      }
    ]
  }

  changeNotificationType() {
    this.showAllEvents = !this.showAllEvents;
  }



}
