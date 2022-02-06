import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RecoveryAccessService } from 'src/app/acesso/services/recovery-access.service';
import { MessageModalService } from 'src/app/shared/ui/modal-dialog/modal-dialog/message-modal.service';
import { MessageModal } from 'src/app/shared/ui/modal-dialog/modal-dialog/messageModal';
import { ModalDialogComponent } from 'src/app/shared/ui/modal-dialog/modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-acess-recovery.',
  templateUrl: './acess-recovery.component.html',
  styleUrls: ['./acess-recovery.component.scss']
})

export class AcessRecoveryComponent implements OnInit {

  formGroup: FormGroup;
  email: string;
  code: string;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private recoverEmailService: RecoveryAccessService,
    private messageModal: MessageModalService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      code: ['', (this.code ? Validators.required : Validators.nullValidator)],
      email: ['', (this.email ? Validators.required : Validators.nullValidator)],
    });
  }

  async submit() {
    try {
      this.formGroup.markAllAsTouched();
      if (this.formGroup.valid) {
        const code: number = this.formGroup.value.code;
        const email: string = this.formGroup.value.email;

        await this.recoverEmailService.recoverAccess(code, email)
        this.messageModal.showModal({
          title: "Sucesso",
          message: "Verifique sua caixa de email para recuperar seu acesso",
          time: 4100,
          isErrorMessage: false
        });
      }
    } catch (error) {
      let errorMessage = error.error.message;
      let titleMessage = error.error.title;
      let isErrorMessage = true;
      let messageTime = 4100

      let modalMessage = new MessageModal(titleMessage, errorMessage, isErrorMessage, messageTime)
      this.messageModal.showModal(modalMessage)
    }

  }

  openModalUseTerms(body) {
    this.dialog.open(ModalDialogComponent, {
      data: { title: body.title, message: body.message },
      disableClose: false,
      autoFocus: false,
      width: '40%',
      maxHeight: '50%'
    });
  }


  viewPassword(@ViewChild('password') password) {
    if (password.type == 'password') {
      password.type = 'text';
    }
    else {
      password.type = 'password';
    }
  }

}
