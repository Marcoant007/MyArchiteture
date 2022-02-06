import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './acesso/pages/logout/logout.component';
import { PainelComponent } from './shared/ui/painel/painel/painel.component';
import { WrapperLoginComponent } from './acesso/pages/wrapper-login/wrapper-login.component';
import { LoginComponent } from './acesso/pages/wrapper-login/login/login.component';
import { AcessRecoveryComponent } from './acesso/pages/wrapper-login/acess-recovery/acess-recovery.component';
import { PasswodChangeComponent } from './acesso/pages/wrapper-login/passwod-change/passwod-change.component';
import { EmailRecoveryComponent } from './acesso/pages/wrapper-login/email-recovery/email-recovery.component';
import { ModelPageComponent } from './acesso/pages/wrapper-page/model-page.component';
import { DashboardComponent } from './acesso/pages/wrapper-page/dashboard/dashboard.component';
import { FirstAccessComponent } from './acesso/pages/wrapper-login/first-access/first-access.component';
import { TermsAndCookiesComponent } from './acesso/pages/terms-and-cookies/terms-and-cookies.component';
import { UserListComponent } from './acesso/pages/wrapper-page/users/user-list/user-list.component';
import { UserFormComponent } from './acesso/pages/wrapper-page/users/user-form/user-form.component';
import { HelpCenterComponent } from './acesso/pages/help-center/help-center/help-center.component';
import { LanguageSettingComponent } from './acesso/pages/language-setting/language-setting/language-setting.component';
import { InstitutionsListComponent } from './acesso/pages/wrapper-page/institutions/institutions-list/institutions-list.component';
import { InstitutionsFormComponent } from './acesso/pages/wrapper-page/institutions/institutions-form/institutions-form.component';
import { InstitutionsFormConfigComponent } from './acesso/pages/wrapper-page/institutions/institutions-form-config/institutions-form-config.component';
import { NotificationListComponent } from './shared/ui/notification/notification-list/notification-list.component';
import { NotificationSettingsComponent } from './shared/ui/notification/notification-settings/notification-settings.component';
import { EditUserProfileComponent } from './acesso/pages/wrapper-page/users/edit-user-profile/edit-user-profile.component';
import { NotificationsComponent } from './acesso/pages/notifications/notifications/notifications.component';
import { UserGuard } from './acesso/pages/wrapper-page/users/user.guard';
import { InstitutionsGuard } from './acesso/pages/wrapper-page/institutions/institutions.guard';
import { PlanListComponent } from './acesso/pages/plan/plan-list/plan-list.component';
import { PlanFormComponent } from './acesso/pages/plan/plan-form/plan-form.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "prefix" },
  {
    path: "", component: WrapperLoginComponent, children: [
      { path: "login", component: LoginComponent },
      { path: "passwordrecovery", component: AcessRecoveryComponent },
      { path: "emailrecovery", component: EmailRecoveryComponent },
      { path: "passwordchange", component: PasswodChangeComponent },
      { path: "firstaccess/:token", component: FirstAccessComponent },
    ]
  },
  {
    path: "", component: ModelPageComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UserListComponent, canActivate: [UserGuard] },
      { path: 'institutions', component: InstitutionsListComponent, canActivate: [InstitutionsGuard] },
      { path: 'institutionsform', component: InstitutionsFormComponent, canActivate: [InstitutionsGuard] },
      { path: 'institutionsformconfig/:id', component: InstitutionsFormConfigComponent, canActivate: [InstitutionsGuard] },
      { path: 'users/:id', component: UserListComponent, canActivate: [UserGuard] },
      { path: 'userform', component: UserFormComponent, canActivate: [UserGuard] },
      { path: 'userform/:id', component: UserFormComponent, canActivate: [UserGuard] },
      { path: 'helpCenter', component: HelpCenterComponent },
      { path: 'languageSetting', component: LanguageSettingComponent },
      { path: 'edituser/:id', component: EditUserProfileComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'plan', component: PlanListComponent },
      { path: 'planForm', component: PlanFormComponent },
      { path: 'planForm/:id', component: PlanFormComponent }
    ]
  },
  { path: "termsandcookies", component: TermsAndCookiesComponent },
  { path: "emailrecovery", component: EmailRecoveryComponent },
  { path: "logout", component: LogoutComponent },
  {
    path: "",
    component: PainelComponent,
    children: [
      { path: "notificacoes", component: NotificationListComponent },
      { path: "configurar-notificacoes", component: NotificationSettingsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
