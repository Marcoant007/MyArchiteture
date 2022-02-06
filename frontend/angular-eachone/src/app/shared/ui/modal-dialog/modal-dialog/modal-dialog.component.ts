import { Component, OnInit } from '@angular/core';
import { time } from 'console';
import { Subscription } from 'rxjs';
import { MessageModalService } from './message-modal.service';
import { MessageModal } from './messageModal';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {

  isErrorMessage: boolean;

  messageContent: MessageModal = { title: '', message: '', isErrorMessage: true };
  openModal: boolean = false;
  messageTime: number = 4100;
  subs: Subscription;

  private messageService: MessageModalService;

  constructor(
    _messageService: MessageModalService
  ) {
    this.messageService = _messageService
  }

  ngOnInit(): void {
    this.subs = this.messageService.getObservable().subscribe((message: MessageModal) => {
      this.messageContent = message;
      this.isErrorMessage = message.isErrorMessage
      this.messageTime = message.time

      this.showModal()

      setTimeout(this.closeModal, this.messageTime)
    })
  }
  closeModal() {
    var modal = document.getElementById('body')
    modal.style.display = "none";
  }

  showModal() {
    this.openModal = true;
    var modal = document.getElementById('body')
    modal.style.display = "block";
    document.documentElement.style.setProperty('--modal-dialog-time', `${this.messageTime + 'ms'}`)
  }
}

