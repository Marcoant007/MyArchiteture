import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  totalPages: number;

  @Input()
  actualPage: number = 1;

  @Input()
  totalCount: number;

  @Input()
  range: number = 2;

  @Input()
  limit: number;

  @Output()
  goToPageEmitter = new EventEmitter();



  constructor() { }

  ngOnInit(): void {
  }

  public getPages(): any[] {
    if (!this.totalCount || !this.limit) {
      return [];
    }

    this.totalPages = Math.ceil((this.totalCount / this.limit));
    const paginationItems = Array.from(Array(this.totalPages).keys());
    return paginationItems;
  }

  public goToPage(page: number) {
    this.actualPage = page;
    this.goToPageEmitter.emit(this.actualPage);
  }

  public rangePagesVisible(page): boolean {
    let rangeRigth = this.range;
    let rangeLeft = this.range;
    const actualPage = this.actualPage;
    const lastPage = this.totalPages;

    if (page == this.actualPage) {
      return true;
    }

    const left = actualPage - rangeLeft;
    if (left < 1) {
      rangeRigth += (left * -1 + 1)
    }

    const rigth = lastPage - (actualPage + rangeRigth);
    if (rigth < 1) {
      rangeLeft += (rigth * -1)
    }

    if (page > this.actualPage && page <= (actualPage + rangeRigth)) {
      return true;
    }

    if (page < this.actualPage && page >= (actualPage - rangeLeft)) {
      return true;
    }
  }


}
