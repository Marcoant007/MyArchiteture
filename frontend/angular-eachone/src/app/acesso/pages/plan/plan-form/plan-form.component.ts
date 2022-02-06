import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/acesso/services/language.service';
import { PlanService } from 'src/app/acesso/services/plan.service';
import PlanDTO from 'src/app/shared/dtos/PlanDTO';
import { Messages } from 'src/app/shared/messages/Messages';
import { SnackbarAction, SnackConfirmEnum } from 'src/app/shared/ui/modal-dialog/snackbar-confirm/snackbar-confirm.component';
import { SnackbarActionService } from 'src/app/shared/ui/modal-dialog/snackbar-confirm/snackbar-confirm.service';
import { SnackbarService } from 'src/app/shared/ui/modal-dialog/snackbar/snackbar.service';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss']
})
export class PlanFormComponent implements OnInit {

  public formGroup: FormGroup;
  public list_country = Array();
  public disable: Boolean;
  public buttonClickAllowed: boolean;
  public plan: PlanDTO = new PlanDTO();
  public currentStatus: string;
  public idPlan: number;
  public subsSnackbar: Subscription;
  public type = new SnackbarAction();

  breadcrumb = [{
    name: 'Planos',
    route: 'plan',
    permition: 'any'
  }, {
    name: 'Cadastrar',
    route: 'planForm',
    permition: 'any'
  }]

  constructor(
    private formBuilder: FormBuilder,
    private languageService: LanguageService,
    private location: Location,
    private snackbarService: SnackbarService,
    private planService: PlanService,
    private routeActived: ActivatedRoute,
    private snackbarConfirm: SnackbarActionService
  ) { }

  async ngOnInit() {
    this.routeActived.params.subscribe(async params => {
      this.idPlan = params.id;
      await this.initForm();
      if (this.idPlan) {
        this.isView();
      }
    })
    this.subsSnackbar = this.snackbarConfirm.getObservableSnack().subscribe(actionSnackbar => {
      if (actionSnackbar.isConfirm) {
        this.confirmDelete();
      }
    })
    this.loadAllLanguagesOrganization();
  }

  async initForm() {
    await this.loadPlansData();
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      name: [this.plan.name, Validators.required],
      value: [this.plan.value, Validators.required],
      monthly_value: [this.plan.monthly_value, Validators.required],
      users: [this.plan.users, Validators.required],
      suport: [''],
      validity: [this.plan.validity, Validators.required],
      description: [this.plan.description],
      status: [this.plan.status],
      language: ['']
    })
  }

  async loadAllLanguagesOrganization() {
    this.list_country = await this.languageService.findLanguages();
  }

  backToList() {
    this.location.back();
  }

  async loadPlansData() {
    if (!this.idPlan) {
      this.plan = new PlanDTO();
      return
    }

    this.plan = await this.planService.findPlanById(this.idPlan);
    this.plan.validity = this.convertDate(this.plan.validity);

  }

  public clickDelete() {
    this.type.show = true;
    this.type.title = 'Desabilitar Plano';
    this.type.isConfirm = false;
    this.type.type = SnackConfirmEnum.delete;

    this.snackbarConfirm.typeAction(this.type);
  }

  public async confirmDelete() {
    await this.planService.deletePlan(this.idPlan);
    this.idPlan = undefined;
    this.snackbarService.showSnackbar(Messages.successDisablePlan);
    this.location.back();
  }

  convertDate(date: Date) {
    let dateConfig = new Date(date);
    let day: any = dateConfig.getDate();
    if (day < 10) {
      day = '0' + day
    }
    let month = dateConfig.getMonth() + 1;
    let year = dateConfig.getFullYear();
    let dateFormat = year + '-' + month + '-' + day;
    return dateFormat
  }

  isView() {
    this.currentStatusVerify(this.plan);
    this.formGroup.disable();
    this.disable = true;
  }

  isChange() {
    this.formGroup.enable();
    this.disable = false;
  }

  editMode() {
    this.buttonClickAllowed = true;
    this.isChange();
  }

  async updateData() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      let form = this.formGroup.value;
      this.plan.name = form.name;
      this.plan.description = form.description;
      this.plan.value = form.value;
      this.plan.monthly_value = form.monthly_value;
      this.plan.users = form.users;
      this.plan.validity = form.validity;
      this.plan.description = form.description;
      this.plan.active = form.active;
      this.plan.status = form.status;

      return true;
    } else {
      return false;
    }
  }

  async currentStatusVerify(plan: any) {
    if (plan.active) {
      this.currentStatus = 'H';
    }
    if (!plan.active) {
      this.currentStatus = 'D';
    }
    if (plan.blocked) {
      this.currentStatus = 'B';
    }
    this.formGroup.controls['status'].setValue(this.currentStatus);
  }

  changeStatus($event) {
    let status = $event;
    this.formGroup.controls['status'].setValue(status);

    this.plan.status = status;
  }

  async submit() {
    const formIsValid = await this.updateData();

    if (!formIsValid) {
      this.snackbarService.showSnackbar(Messages.invalidForm);
      return;
    }

    if (this.idPlan) {
      await this.planService.updatePlan(this.idPlan, this.plan)
      this.location.back();
      this.snackbarService.showSnackbar(Messages.successUpdatePlan);
      return;
    }

    await this.planService.create(this.plan);
    this.snackbarService.showSnackbar(Messages.successCreatePlan);
    this.location.back();
  }

  ngOnDestroy() {
    this.subsSnackbar.unsubscribe();
  }
}
