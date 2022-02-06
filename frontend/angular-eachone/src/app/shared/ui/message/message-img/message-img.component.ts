import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageImg } from './message-img';
import { MessageImgService } from './message-img.service';

@Component({
  selector: 'app-message-img',
  templateUrl: './message-img.component.html',
  styleUrls: ['./message-img.component.scss']
})
export class MessageImgComponent implements OnInit, OnDestroy {

  message: MessageImg;
  private subscriptionTwo: Subscription;

  constructor(private messageService: MessageImgService) {

    this.subscriptionTwo = this.messageService
      .messageObservable()
      .subscribe(
        (message: MessageImg) => {
          this.message = message;
        })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptionTwo.unsubscribe();
  }

  closeMessage() {
    this.message = null;
  }
}
