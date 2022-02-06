import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WrapperService } from '../../services/wrapper.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private wrapperService: WrapperService
  ) { }

  hideSideBar: boolean = false
  rotateIconSidebar: boolean = false
  clicked = true;

  @Input()
  logo: any = '';

  @Input()
  menu: any[] = [];
  public subs: Subscription;

  ngOnInit(): void {
    this.subs = this.wrapperService.getObservable().subscribe(isMenuOpen => {
      this.showSideMenu()
    });
  }

  expand() {
    this.wrapperService.handle();
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  showSideMenu() {
    this.clicked = false
    this.hideSideBar = !this.hideSideBar
    this.rotateIconSidebar = !this.rotateIconSidebar
  }
}
