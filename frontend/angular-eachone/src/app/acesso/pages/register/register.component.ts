import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/acesso/services/user.service';
import { MessageService } from 'src/app/shared/ui/message/message/message.service';
import { ModalDialogComponent } from 'src/app/shared/ui/modal-dialog/modal-dialog/modal-dialog.component';
import ValidatesFormGroup from '../../../shared/utils/ValidatesFormGroup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;
  user: any;
  errorMessage: string;

  //@ViewChild('password')
  //password: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      cpf_cnpj: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirm: ['', Validators.required],
      accept_contract: [false, Validators.requiredTrue],
    }, {
      validators: [ValidatesFormGroup.validatorCpfCnpj, this.formValidatorPasswordEquals]
    });
  }

  async submit() {
    try {
      this.formGroup.markAllAsTouched();

      if (this.formGroup.valid) {
        const user = this.formGroup.value;

        //await this.userService.register(user);

        this.router.navigateByUrl('');

        this.messageService.send({
          title: 'CONFIRME SEU CADASTRO',
          message: `Enviamos um e-mail para <b>${user.email}</b> que contém um link de confirmação. Siga as instruções que estão
        no e-mail para concluir o processo.`,
          submessage: 'Caso não o encontre em sua caixa de entrada certifique-se de que o mesmo não se encontra na caixa de spam.'
        });
      }
    } catch (error) {
      this.errorMessage = error.error.message;
    }
  }

  openModalUseTerms() {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: { title: "TERMOS DE USO", message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
      disableClose: false,
      autoFocus: false,
      width: '80%',
      maxHeight: '95%'
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

  formValidatorPasswordEquals(group: FormGroup) {
    let password = group.get('password');
    let password_confirm = group.get('password_confirm');

    if (password_confirm.value) {
      if (password.value !== password_confirm.value) {
        password_confirm.setErrors({ differentPasswords: true });
      } else {
        password_confirm.setErrors(null);
      }
    }
  }

  redirectToLogin() {
    this.router.navigateByUrl('login')
  }
}
