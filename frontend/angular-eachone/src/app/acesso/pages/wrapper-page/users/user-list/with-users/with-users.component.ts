import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WrapperService } from 'src/app/shared/services/wrapper.service';

@Component({
  selector: 'app-with-users',
  templateUrl: './with-users.component.html',
  styleUrls: ['./with-users.component.scss']
})
export class WithUsersComponent implements OnInit, OnDestroy {

  modalIsOn = true;

  @Input()
  users: any[];

  @Input()
  usersList: any[];

  @Input()
  actualPage: number;

  @Input()
  totalCount: number;

  @Input()
  limit: number;

  @Input()
  itemsSelect: string[];

  @Output()
  paginatorEmitter = new EventEmitter;

  @Output()
  searchAutocompleteEmitter = new EventEmitter;


  @Output()
  selectUserTypeEmitter = new EventEmitter;

  @Output()
  exportUserExcell = new EventEmitter;

  @Output()
  printUser = new EventEmitter;

  breadcrumb = [{
    name: 'Dashboard',
    route: 'dashboard',
    permition: 'any'
  }, {
    name: 'Usuários',
    route: 'users',
    permition: 'any'
  }]

  @Output()
  deleteEmitter = new EventEmitter;

  public hideHeader: Boolean;
  public subs: Subscription;

  constructor(
    private wrapperService: WrapperService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs = this.wrapperService.getObservable().subscribe(isMenuOpen => {
      this.hideHeader = !isMenuOpen;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  clickDropdownValue(event: any) {
    let resultUser = Array();
    resultUser.push(event);
    this.users = resultUser;
  }

  async searchAutocomplete(name: string) {
    this.searchAutocompleteEmitter.emit(name);
  }

  addNewUser() {
    this.router.navigateByUrl('/userform');
  }

  goToPage(page: number) {
    this.actualPage = page;
    this.paginatorEmitter.emit(page);
  }

  selectItemEvent($event) {
    this.selectUserTypeEmitter.emit($event);

  }

  delete($event) {
    this.deleteEmitter.emit($event);
  }

  exportAsXLSX() {
    this.exportUserExcell.emit();
  }

  exportUserprint() {
    this.printUser.emit();
  }

  exit() {
    this.modalIsOn = false
  }
}
