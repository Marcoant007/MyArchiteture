import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcumbModule } from '../breadcumb/breadcumb.module';
import { InputModule } from '../input/input.module';
import { PaginationModule } from '../pagination/pagination.module';
import { ToggleSwitchModule } from '../toggle-switch/toggle-switch.module';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { EventsListComponent } from './notification-list/events-list/events-list.component';
import { AlarmsListComponent } from './notification-list/alarms-list/alarms-list.component';
import { NotificationCategoryIconComponent } from './notification-list/notification-category-icon/notification-category-icon.component';
import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';
import { NotificationCardComponent } from './notification-card/notification-card.component';



@NgModule({
  declarations: [NotificationListComponent, EventsListComponent, AlarmsListComponent, NotificationCategoryIconComponent, NotificationSettingsComponent, NotificationCardComponent],
  imports: [
    CommonModule,
    BreadcumbModule,
    InputModule,
    PaginationModule,
    ToggleSwitchModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NotificationListComponent,
    NotificationCardComponent,
  ]
})
export class NotificationModule { }
