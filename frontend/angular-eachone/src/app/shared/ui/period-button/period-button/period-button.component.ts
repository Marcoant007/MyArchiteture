import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-period-button',
  templateUrl: './period-button.component.html',
  styleUrls: ['./period-button.component.scss']
})
export class PeriodButtonComponent implements OnInit {

  activedDay: boolean = true
  activedWeek: boolean = false
  activedMonth: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  active(turn){
    this.activedDay = false
    this.activedMonth = false
    this.activedWeek = false

    if (turn == 'day'){
      this.activedDay = true
    }
    if (turn == 'week'){
      this.activedWeek = true
    }
    if (turn == 'month'){
      this.activedMonth = true
    }

  }

}
