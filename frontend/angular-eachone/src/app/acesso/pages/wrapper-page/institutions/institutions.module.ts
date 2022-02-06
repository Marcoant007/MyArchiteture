import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionsListComponent } from './institutions-list/institutions-list.component';
import { InstitutionsFormComponent } from './institutions-form/institutions-form.component';
import { WithInstitutionsComponent } from './institutions-list/with-institutions/with-institutions.component';
import { WithoutInstitutionsComponent } from './institutions-list/without-institutions/without-institutions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InstitutionsFormOldComponent } from './institutions-form-old/institutions-form-old.component';
import { InstitutionsFormConfigComponent } from './institutions-form-config/institutions-form-config.component';


@NgModule({
  declarations: [
    InstitutionsListComponent,
    InstitutionsFormComponent,
    WithInstitutionsComponent,
    WithoutInstitutionsComponent,
    InstitutionsFormOldComponent,
    InstitutionsFormConfigComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    InstitutionsListComponent,
    InstitutionsFormComponent,
    WithInstitutionsComponent,
    WithoutInstitutionsComponent
  ]
})
export class InstitutionsModule { }
