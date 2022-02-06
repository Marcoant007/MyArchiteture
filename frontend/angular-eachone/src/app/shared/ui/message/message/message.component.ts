import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from './message';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  message: Message;
  private subscription: Subscription;

  constructor(private messageService: MessageService) {

    this.subscription = messageService
      .messageObservable()
      .subscribe(
        (message: Message) => {
          this.message = message;
        })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeMessage() {
    this.message = null;
  }
}
