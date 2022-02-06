import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarButtonComponent } from './calendar-button/calendar-button.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCalendar, MatCalendarBody, MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';





@NgModule({
  declarations: [
    CalendarButtonComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatCardModule
  ],
  exports:[
    CalendarButtonComponent
  ]
})
export class CalendarButtonModule { }
