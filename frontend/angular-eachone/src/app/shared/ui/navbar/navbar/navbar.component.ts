import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackgroundService } from 'src/app/shared/services/background.service';
import { WrapperService } from 'src/app/shared/services/wrapper.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  placeHolder = "Pesquisar"
  value = ''
  darkTheme: boolean = false;
  subs: Subscription;

  constructor(
    private BackgroundService: BackgroundService,
    private wrapperService: WrapperService
  ) { }

  ngOnInit(): void {
    this.subs = this.BackgroundService.getObservable().subscribe(isDashboard => {
      this.darkTheme = this.BackgroundService.darkTheme
    })
  }

  handleOpenMenu() {
    this.wrapperService.handle()
  }

  searchGo(data) {
    console.log(data)
  }
}


