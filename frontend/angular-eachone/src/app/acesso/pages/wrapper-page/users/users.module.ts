import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';
import { WithUsersComponent } from './user-list/with-users/with-users.component';
import { WithoutUsersComponent } from './user-list/without-users/without-users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
@NgModule({
  declarations:
    [
      UserFormComponent,
      UserListComponent,
      WithUsersComponent,
      WithoutUsersComponent,
      EditUserProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    
  ],
  exports: [UserFormComponent, UserListComponent, WithUsersComponent, WithoutUsersComponent, EditUserProfileComponent]
})
export class UsersModule { }
