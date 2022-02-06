import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/acesso/services/user.service';
import CreateUserDTO from 'src/app/shared/dtos/CreateUserDTO';
import { UserStatusEnum } from 'src/app/shared/Enum/UserStatusEnum';
import { MessageService } from '../../message/message/message.service';

@Component({
  selector: 'app-circle-status',
  templateUrl: './circle-status.component.html',
  styleUrls: ['./circle-status.component.scss']
})
export class CircleStatusComponent implements OnInit {
  @Input()
  status: string;

  users: CreateUserDTO;
  id = undefined;

  @Input()
  disabled: boolean;

  @Output()
  statusUserEmit = new EventEmitter();

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.id = params.id;
    });
  }

  async update(status: string) {

    if (!this.disabled) {
      this.status = status;
      this.statusUserEmit.emit(this.status);
    }
  }
}
