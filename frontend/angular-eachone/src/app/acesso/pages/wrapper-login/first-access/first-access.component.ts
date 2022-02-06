import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/acesso/services/auth.service';
import { UserService } from 'src/app/acesso/services/user.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { MessageService } from 'src/app/shared/ui/message/message/message.service';
import { MessageModalService } from 'src/app/shared/ui/modal-dialog/modal-dialog/message-modal.service';
import { MessageModal } from 'src/app/shared/ui/modal-dialog/modal-dialog/messageModal';

@Component({
  selector: 'app-first-access',
  templateUrl: './first-access.component.html',
  styleUrls: ['./first-access.component.scss']
})
export class FirstAccessComponent implements OnInit {

  formGroup: FormGroup;
  token: any;
  user: any = { name: 'pedro', userType: 'admin' };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialogModalService: MessageModalService,
    private userService: UserService,
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.user = this.sessionService.getItem("user")
    this.route.params.subscribe(params => {
      this.token = params['token'];
    })

    await this.validateToken();
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      password: ['', Validators.nullValidator],
      password_confirm: ['', Validators.nullValidator]
    });
  }

  async submit() {
    try {
      this.formGroup.markAllAsTouched();
      if (this.formGroup.valid) {
        const password = this.formGroup.value.password;
        const confirmPassword = this.formGroup.value.password_confirm;
        await this.userService.resetPassword(password, confirmPassword, this.token);

        this.dialogModalService.showModal({
          title: "SENHA ALTERADA",
          message: "Sua senha foi modificada com sucesso",
          time: 4100,
          isErrorMessage: false
        });
        this.router.navigateByUrl('login')
      }
    } catch (error) {
      let errorMessage = error.error.message;
      let titleMessage = error.error.title;
      let isErrorMessage = true;
      let messageTime = 4100;

      let modalMessage = new MessageModal(titleMessage, errorMessage, isErrorMessage, messageTime)
      this.dialogModalService.showModal(modalMessage)
    }
  }

  async validateToken() {
    try {
      await this.authService.loginValidate(this.token)
    } catch (error) {

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

  viewPassword(@ViewChild('password') password) {
    if (password.type == 'password') {
      password.type = 'text';
    }
    else {
      password.type = 'password';
    }
  }
}
