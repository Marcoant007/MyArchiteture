import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SnackMessageEnum } from 'src/app/shared/Enum/SnackMessageEnum';
import { SnackbarMessage } from 'src/app/shared/messages/MessagesClass';
import { SnackbarService } from './snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  public subs: Subscription;
  public messageTypes = SnackMessageEnum;
  public message: SnackbarMessage;

  private timeOut;

  constructor(
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.subs = this.snackbarService.getObservable().subscribe((message: SnackbarMessage) => {
      this.message = message;
      this.message.show = true;
      this.timeOut = setTimeout(() => {
        this.message.show = false;
      }, this.message.timer)
    });
  }

  typeToIcon(): string {
    switch (this.message.type) {
      case SnackMessageEnum.success:
        return "fa-check";
      case SnackMessageEnum.error:
        return "fa-times"
      case SnackMessageEnum.info:
        return "fa-exclamation"
      case SnackMessageEnum.warn:
        return "fa-exclamation-triangle"
      case SnackMessageEnum.fatal:
        return "fa-dizzy"
    }
  }

  public type(): string {
    switch (this.message.type) {
      case SnackMessageEnum.success:
        return "success";
      case SnackMessageEnum.error:
        return "error"
      case SnackMessageEnum.info:
        return "info"
      case SnackMessageEnum.warn:
        return "warn"
      case SnackMessageEnum.fatal:
        return "fatal"
    }
  }
  public ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

