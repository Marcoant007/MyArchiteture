import { Component, OnInit, Output } from '@angular/core';
import { BackgroundService } from 'src/app/shared/services/background.service';
import { WrapperService } from 'src/app/shared/services/wrapper.service';
import { ModalFilterService } from 'src/app/shared/ui/modal-filter/modal-filter/modal-filter.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = "Dashboard"
  subs: any;
  breadcrumb = [{
    name: 'Dashboard',
    route: 'dashboard',
    permition: 'anby'
  }]

  constructor(
    private BackgroundService: BackgroundService,
    private wrapperService: WrapperService,
    private modalFilterService: ModalFilterService
  ) { }

  ngOnInit(): void {
    this.subs = this.BackgroundService.getObservable().subscribe(isDashboardPage => {
      this.changeBackground()
    })

    this.isDashboardPage()
  }

  public changeBackground() {
    if (this.BackgroundService.dashboard) {
      this.BackgroundService.darkTheme = !this.BackgroundService.darkTheme
      if (this.BackgroundService.darkTheme) {
        document.documentElement.style.setProperty('--background-color', '#2B2C3A');
      }
      if (!this.BackgroundService.darkTheme) {
        document.documentElement.style.setProperty('--background-color', '#fff');
      }
    }
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  isDashboardPage() {
    this.BackgroundService.dashboard = true
  }
  modal() {
    this.modalFilterService.handle()
  }

}
