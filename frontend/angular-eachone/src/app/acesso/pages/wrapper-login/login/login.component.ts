import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageModalService } from 'src/app/shared/ui/modal-dialog/modal-dialog/message-modal.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/acesso/services/auth.service';
import { ForgotPasswordComponent } from '../../forgot-password/forgot-password.component';
import { UserDTO } from '../../../../shared/dtos/UserDTO';
import { SessionService } from 'src/app/shared/services/session.service';
import { MessageModal } from 'src/app/shared/ui/modal-dialog/modal-dialog/messageModal';
import { ProfileModel } from 'src/app/shared/models/profile.model';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { RouteUserTypeService } from 'src/app/shared/services/route-user-type.service';
import { MenuFactory } from 'src/app/shared/ui/painel/painel/menu-factory.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  user: any;
  name: string;
  token: string;
  isFirstAcess: boolean
  users: UserDTO

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageModalService,
    private profileService: ProfileService,
    private routeUserTypeService: RouteUserTypeService,
    public dialog: MatDialog,
    private router: Router,
    private sessionService: SessionService,
    private menuFactory: MenuFactory,
  ) { }

  ngOnInit(): void {
    this.checkValidateLogin();
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  async submit() {
    try {
      this.formGroup.markAllAsTouched();
      if (this.formGroup.valid) {
        const form = this.formGroup.value;
        const user: any = {};
        user.email = form.email;
        user.password = form.senha;
        const credentials = await this.authService.login(user);

        const profile: ProfileModel = new ProfileModel();

        profile.load(credentials)

        this.profileService.save(profile);

        this.menuFactory.reloadProfileData();

        this.profileService.get();

        this.sessionService.setItem("user", credentials);

        if (credentials.isFirstAcess) {
          await this.redirectToFirstAccess(credentials.token);
          return;
        }

        this.router.navigateByUrl(this.routeUserTypeService.getRouteFromUserType());

      }
    } catch (error) {
      let errorMessage = error.error.message;
      let titleMessage = error.error.title;
      let isErrorMessage = true;
      let messageTime = 4100;

      let modalMessage = new MessageModal(titleMessage, errorMessage, isErrorMessage, messageTime)
      this.messageService.showModal(modalMessage)
    }
  }

  async redirectToDashboard() {
    await this.router.navigateByUrl("dashboard")
  }

  async redirectToTerms() {
    await this.router.navigateByUrl("termsandcookies")
  }

  async redirectToFirstAccess(token: string) {
    await this.router.navigateByUrl(`firstaccess/${token}`)
  }

  async recoverUserEmail() {
    this.router.navigateByUrl("emailrecovery")
  }

  async recoverUserPassword() {
    this.router.navigateByUrl("passwordrecovery")
  }

  async checkValidateLogin() {
    const token = this.activatedRoute.snapshot.queryParams.token;

    if (token) {
      await this.authService.loginValidate(token);
    }
  }

  forgotPasswordModal() {
    if (this.users.blocked) {
      const dialogRef = this.dialog.open(ForgotPasswordComponent, {
        autoFocus: false,
        maxHeight: '95%'
      });
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

  redirectToRegister() {
    this.router.navigateByUrl('cadastre-se')
  }
}
