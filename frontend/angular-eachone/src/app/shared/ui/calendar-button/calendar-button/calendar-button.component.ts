import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-button',
  templateUrl: './calendar-button.component.html',
  styleUrls: ['./calendar-button.component.scss']
})
export class CalendarButtonComponent implements OnInit {

  day = new Date();
  selected: Date | null;
  dayShowCase: String;
  calendarOpen: boolean = false

  private monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dec"
];
  constructor() { }

  ngOnInit(): void {
    this.dayShowCase = ((this.day.getDate() + " " + this.monthNames[(this.day.getMonth())] + " " + this.day.getFullYear()));
  }

  newDate(){
    let newDate = ((this.selected.getDate() + " " + this.monthNames[(this.selected.getMonth())] + " " + this.selected.getFullYear()));
    if( newDate != this.dayShowCase){
      this.calendarOpen = !this.calendarOpen
    }
    this.dayShowCase = ((this.selected.getDate() + " " + this.monthNames[(this.selected.getMonth())] + " " + this.selected.getFullYear()));
  }
}
