import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import CreateUserDTO from 'src/app/shared/dtos/CreateUserDTO';
import { UserStatusEnum } from 'src/app/shared/Enum/UserStatusEnum';
import { WrapperService } from 'src/app/shared/services/wrapper.service';


@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.scss']
})
export class TableUserComponent implements OnInit {

  @Input()
  isErrorWarningScreen: boolean = false;
  @Input()
  usersList: any[]
  user: CreateUserDTO
  status: UserStatusEnum
  public id = undefined

  @Input()
  public error: Boolean = false

  @Input()
  editPermission: string;

  @Input()
  deletePermission: string;

  @Output()
  deleteEmitter = new EventEmitter();

  public subs: Subscription;
  public isExpandTable: boolean;

  constructor(private wrapperService: WrapperService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.id = params.id;
    });

    this.isClosedMenu();
    this.subs = this.wrapperService.getObservable().subscribe(isMenuOpen => {
      this.isExpandTable = !isMenuOpen;
    });
  }

  isClosedMenu() {
    if (!this.wrapperService.isOpen) {
      this.isExpandTable = true;
    }
  }

  async update(user: CreateUserDTO) {
    this.router.navigateByUrl(`userform/${user.id}`)
  }

  delete($event) {
    this.deleteEmitter.emit($event);
  }

  expand() {
    this.wrapperService.handle();
  }
}
