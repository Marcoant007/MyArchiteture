import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-with-institutions',
  templateUrl: './with-institutions.component.html',
  styleUrls: ['./with-institutions.component.scss']
})
export class WithInstitutionsComponent implements OnInit {

  @Input()
  institutions: any[];

  @Input()
  actualPage: number = 1;

  @Input()
  totalCount: number = 9;

  @Input()
  limit: number = 3;

  @Output()
  paginatorEmitter = new EventEmitter;

  @Output()
  deleteEmitter = new EventEmitter;

  @Output()
  viewEmitter = new EventEmitter;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToPage(page: number) {
    this.actualPage = page;
    this.paginatorEmitter.emit(page);
  }

  addNewInstitutions() {
    this.router.navigateByUrl('/institutionsform');
  }

  clickEdit($event) {
    this.viewEmitter.emit($event);
  }

  clickDelete($event) {
    this.deleteEmitter.emit($event);
  }
}
