import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  showLoading: boolean;

  private subscription: Subscription;

  constructor(loadingService: LoadingService) {
    this.subscription = loadingService.showLoadingObservable().subscribe(
      showLoading => {
        this.showLoading = showLoading;
      })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
