import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/acesso/services/auth.service';
import { UserService } from 'src/app/acesso/services/user.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { MessageModalService } from 'src/app/shared/ui/modal-dialog/modal-dialog/message-modal.service';


@Component({
  selector: 'app-passwod-change',
  templateUrl: './passwod-change.component.html',
  styleUrls: ['./passwod-change.component.scss']
})

export class PasswodChangeComponent implements OnInit {

  formGroup: FormGroup;
  token: string;
  sessionProfile: any
  userProfile: any;
  titleToolTip: string = 'Sua senha deve ter';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private messageModal: MessageModalService,
    private userService: UserService,
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get("token");
    this.sessionProfile = this.sessionService.getItem("user");
    await this.validateToken();
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      password: [''],
      password_confirm: ['']
    }, {
      validators: [this.formValidatorPasswordEquals]
    });
  }

  async submit() {
    try {
      this.formGroup.markAllAsTouched();
      if (this.formGroup.valid) {
        const password = this.formGroup.value.password;
        const confirmPassword = this.formGroup.value.password_confirm
        await this.userService.resetPassword(password, confirmPassword, this.token);
        this.messageModal.showModal({
          title: 'SENHA ALTERADA',
          message: `Sua senha foi modificada com sucesso!
            Acesse sua conta com o e-mail cadastrado e sua nova senha.
            `,
          time: 4100,
          isErrorMessage: false
        });
        this.router.navigateByUrl('')
      }
    } catch (error) {
      this.messageModal.showModal({
        title: "Token expirado",
        message: "este email é antigo",
        time: 4100,
        isErrorMessage: true
      });
    }
  }

  async validateToken() {
    try {
      this.userProfile = await this.authService.loginValidate(this.token);
    } catch (error) {
      let errorMessage = error.error.message;
      let titleMessage = error.error.title;
      this.messageModal.showModal({
        title: titleMessage,
        message: errorMessage,
        time: 4100,
        isErrorMessage: true
      });
    }
  }

  redirectToLogin() {
    this.router.navigateByUrl('login')
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
