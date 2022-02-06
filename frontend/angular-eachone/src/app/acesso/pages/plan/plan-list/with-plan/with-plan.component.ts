import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-with-plan',
  templateUrl: './with-plan.component.html',
  styleUrls: ['./with-plan.component.scss']
})
export class WithPlanComponent implements OnInit {

  @Input()
  public planList: any[];

  @Input()
  public totalCount: number = 9;

  @Input()
  public limit: number = 3;

  @Input()
  public actualPage: number = 1;

  @Output()
  paginatorEmitter = new EventEmitter;

  @Output()
  deleteEmitter = new EventEmitter;

  @Output()
  viewEmitter = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

  goToPage(page: number) {
    this.actualPage = page;
    this.paginatorEmitter.emit(page);
  }

  clickEdit($event) {
    this.viewEmitter.emit($event);
  }

  clickDelete($event) {
    this.deleteEmitter.emit($event);
  }
}
