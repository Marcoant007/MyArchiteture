import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SnackbarActionService } from './snackbar-confirm.service';
@Component({
  selector: 'app-snackbar-confirm',
  templateUrl: './snackbar-confirm.component.html',
  styleUrls: ['./snackbar-confirm.component.scss']
})
export class SnackbarConfirmComponent implements OnInit {

  public subs: Subscription;
  public actionsTypes = SnackConfirmEnum;
  public actionSnackbar: SnackbarAction;

  constructor(
    private snackbarAction: SnackbarActionService
  ) { }

  ngOnInit() {
    this.subs = this.snackbarAction.getObservableSnack().subscribe((typeAction: SnackbarAction) => {
      this.actionSnackbar = typeAction;
    })
  }

  typeToIcon(): string {
    switch (this.actionSnackbar.type) {
      case SnackConfirmEnum.delete:
        return "fa-trash";
    }
  }

  confirm() {
    this.actionSnackbar.isConfirm = true;
    this.snackbarAction.typeAction(this.actionSnackbar);
    this.actionSnackbar.show = false;
  }

  cancel() {
    this.actionSnackbar.show = false;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

export class SnackbarAction {
  show: boolean;
  type: SnackConfirmEnum;
  title: string;
  time: number;
  transparent: boolean;
  isConfirm: boolean;

  constructor() {
  }
}


export enum SnackConfirmEnum {
  delete = 'd'
}
