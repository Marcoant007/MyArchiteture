import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-without-users',
  templateUrl: './without-users.component.html',
  styleUrls: ['./without-users.component.scss']
})
export class WithoutUsersComponent implements OnInit {

  title = "Usuários";
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async redirectToNewUser() {
    await this.router.navigateByUrl("/userform");
  }
}
