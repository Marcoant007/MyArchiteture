import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-without-institutions',
  templateUrl: './without-institutions.component.html',
  styleUrls: ['./without-institutions.component.scss']
})
export class WithoutInstitutionsComponent implements OnInit {

  breadcrumb = [{
    name: 'Instituições',
    route: 'institutions',
    permition: 'anby'
  }]


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  addNewInstitutions() {
    this.router.navigateByUrl('/institutionsform');
  }
}
