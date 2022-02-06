import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcumb',
  templateUrl: './breadcumb.component.html',
  styleUrls: ['./breadcumb.component.scss']
})
export class BreadcumbComponent implements OnInit {

  @Input()
  breadcrumb: any[] = [];

  active: boolean;


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleNavigateTo(routeName: string) {
    if (routeName) {
      this.router.navigateByUrl(routeName);
    }
  }

  clickItem() {
    this.active = !this.active;
  }

}
