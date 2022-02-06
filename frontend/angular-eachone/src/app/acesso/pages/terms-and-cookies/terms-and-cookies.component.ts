import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-terms-and-cookies',
  templateUrl: './terms-and-cookies.component.html',
  styleUrls: ['./terms-and-cookies.component.scss']
})
export class TermsAndCookiesComponent implements OnInit {

  constructor(private router: Router) {

   }


  ngOnInit(): void {

  }

  async redirectToLogin(){
    await this.router.navigateByUrl("/login")
  }

}
