import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ConfirmationForgotPasswordComponent } from './pages/forgot-password/confirmation-forgot-password/confirmation-forgot-password.component';
import { RegisterModule } from './pages/register/register.module';
import { LogoutComponent } from './pages/logout/logout.component';
import { WrapperLoginComponent } from './pages/wrapper-login/wrapper-login.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/wrapper-login/login/login.component';
import { AcessRecoveryComponent } from './pages/wrapper-login/acess-recovery/acess-recovery.component';
import { PasswodChangeComponent } from './pages/wrapper-login/passwod-change/passwod-change.component';
import { EmailRecoveryComponent } from './pages/wrapper-login/email-recovery/email-recovery.component';
import { ModalDialogModule } from '../shared/ui/modal-dialog/modal-dialog.module';
import { DashboardComponent } from './pages/wrapper-page/dashboard/dashboard.component';
import { ModelPageComponent } from './pages/wrapper-page/model-page.component';
import { FirstAccessComponent } from './pages/wrapper-login/first-access/first-access.component';
import { TermsAndCookiesComponent } from './pages/terms-and-cookies/terms-and-cookies.component';
import { UsersModule } from './pages/wrapper-page/users/users.module';
import { HelpCenterModule } from './pages/help-center/help-center.module';
import { LanguageSettingModule } from './pages/language-setting/language-setting.module';

import { InstitutionsModule } from './pages/wrapper-page/institutions/institutions.module';
import { NotificationsModule } from './pages/notifications/notifications.module';
import { PlanModule } from './pages/plan/plan.module';

@NgModule({
  declarations: [
    EmailRecoveryComponent,
    PasswodChangeComponent,
    AcessRecoveryComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ConfirmationForgotPasswordComponent,
    LogoutComponent,
    WrapperLoginComponent,
    PasswodChangeComponent,
    ModelPageComponent,
    DashboardComponent,
    FirstAccessComponent,
    TermsAndCookiesComponent
  ],
  imports: [
    ModalDialogModule,
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UsersModule,
    HelpCenterModule,
    LanguageSettingModule,
    InstitutionsModule,
    NotificationsModule,
    PlanModule
  ]
})

export class AcessoModule { }
