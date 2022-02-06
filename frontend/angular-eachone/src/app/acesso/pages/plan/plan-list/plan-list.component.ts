import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlanService } from 'src/app/acesso/services/plan.service';
import { Messages } from 'src/app/shared/messages/Messages';
import { SnackbarAction, SnackConfirmEnum } from 'src/app/shared/ui/modal-dialog/snackbar-confirm/snackbar-confirm.component';
import { SnackbarActionService } from 'src/app/shared/ui/modal-dialog/snackbar-confirm/snackbar-confirm.service';
import { SnackbarService } from 'src/app/shared/ui/modal-dialog/snackbar/snackbar.service';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit {

  public planList: any[] = [];
  public limit: number = 9;
  public actualPage: number = 1;
  public totalCount: number;
  public subsSnackbar: Subscription;
  private idPlan: number;
  public type = new SnackbarAction();

  public breadcrumb = [{
    name: 'Dashboard',
    route: 'dashboard',
    permition: 'anby'
  }, {
    name: 'Planos',
    route: 'plan',
    permition: 'any'
  }]

  public charge = [{
    name: 'Unifacig-Campus 1',
    value: 10000.00,
    monthly: 120.00,
    validity: 12
  }]

  constructor(
    private router: Router,
    private planService: PlanService,
    private snackbarConfirm: SnackbarActionService,
    private snackbarService: SnackbarService
  ) { }

  async ngOnInit() {
    this.subsSnackbar = this.snackbarConfirm.getObservableSnack().subscribe(actionSnackBar => {
      if (actionSnackBar.isConfirm) {
        this.confirmDelete();
      }
    })
    await this.loadListPlans();
  }

  public clickEdit(id: number) {
    this.router.navigateByUrl(`/planForm/${id}`);
  }

  async loadListPlans() {
    let planReponse = await this.loadPlans();
    this.planList = planReponse.plans;
    this.totalCount = planReponse.count;
  }

  async loadPlans() {
    let response = await this.planService.findAllPagedByFilters(this.actualPage, this.limit);
    return response
  }

  public paginatorChange($event) {
    let page = $event;
    this.actualPage = page;
    this.loadListPlans();
  }


  public clickDelete(id: number) {
    this.type.show = true;
    this.type.title = 'Desabilitar Plano';
    this.type.isConfirm = false;
    this.type.type = SnackConfirmEnum.delete;
    this.idPlan = id;
    console.log("IdPlan", this.idPlan);
    this.snackbarConfirm.typeAction(this.type);
  }

  public async confirmDelete() {
    await this.planService.deletePlan(this.idPlan);
    this.idPlan = undefined;

    this.snackbarService.showSnackbar(Messages.successDisablePlan);
    this.loadListPlans();
  }

  async redirectToNewCharge() {
    await this.router.navigateByUrl("/planForm");
  }

  ngOnDestroy() {
    this.subsSnackbar.unsubscribe();
  }
}
