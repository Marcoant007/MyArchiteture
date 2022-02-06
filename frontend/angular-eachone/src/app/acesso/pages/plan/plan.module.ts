import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanListComponent } from './plan-list/plan-list.component';
import { PlanFormComponent } from './plan-form/plan-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WithoutPlanComponent } from './plan-list/without-plan/without-plan.component';
import { WithPlanComponent } from './plan-list/with-plan/with-plan.component';



@NgModule({
  declarations: [PlanListComponent, PlanFormComponent, WithoutPlanComponent, WithPlanComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [PlanListComponent, PlanFormComponent]
})
export class PlanModule { }
