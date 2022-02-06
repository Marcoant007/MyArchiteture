import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RecoveryAccessService } from 'src/app/acesso/services/recovery-access.service';
import { MessageModalService } from 'src/app/shared/ui/modal-dialog/modal-dialog/message-modal.service';
import { MessageModal } from 'src/app/shared/ui/modal-dialog/modal-dialog/messageModal';
import { ModalDialogComponent } from 'src/app/shared/ui/modal-dialog/modal-dialog/modal-dialog.component';


@Component({
  selector: 'app-email-recovery',
  templateUrl: './email-recovery.component.html',
  styleUrls: ['./email-recovery.component.scss']
})

export class EmailRecoveryComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private recoverEmailService: RecoveryAccessService,
    private messageService: MessageModalService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      cpf: ['', Validators.nullValidator],
      registration: ['', Validators.nullValidator]
    });
  }

  async submit() {
    try {
      this.formGroup.markAllAsTouched();

      if (this.formGroup.valid) {
        const cpf: number = this.formGroup.value.cpf;
        const registration: string = this.formGroup.value.registration;

        const email = await this.recoverEmailService.recoverEmail(cpf, registration)
        this.messageService.showModal({
          title: "Sucesso",
          message: `Seu email é ${email}`,
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
      this.messageService.showModal(modalMessage)
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
