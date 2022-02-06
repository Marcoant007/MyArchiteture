import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InstitutionsService } from 'src/app/acesso/services/institutions.service';
import { Messages } from 'src/app/shared/messages/Messages';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { SnackbarAction, SnackConfirmEnum } from 'src/app/shared/ui/modal-dialog/snackbar-confirm/snackbar-confirm.component';
import { SnackbarActionService } from 'src/app/shared/ui/modal-dialog/snackbar-confirm/snackbar-confirm.service';
import { SnackbarService } from 'src/app/shared/ui/modal-dialog/snackbar/snackbar.service';

@Component({
  selector: 'app-institutions-list',
  templateUrl: './institutions-list.component.html',
  styleUrls: ['./institutions-list.component.scss']
})
export class InstitutionsListComponent implements OnInit {

  public institutionsList: any[];
  public actualPage: number = 1;
  public limit: number = 9;
  public totalCount: number;
  public hasInstitutions: boolean = true;
  public type = new SnackbarAction();
  public subsSnackbar: Subscription;
  private idInstitution: number;
  private userPermissions: any;
  private resultOrganization: any;

  constructor(
    private institutionService: InstitutionsService,
    private snackbarConfirm: SnackbarActionService,
    private snackbarService: SnackbarService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.userPermissions = this.profileService.get().permissions;

  }

  async ngOnInit() {
    this.subsSnackbar = this.snackbarConfirm.getObservableSnack().subscribe(actionSnackbar => {
      if (actionSnackbar.isConfirm) {
        this.confirmDelete();
      }
    })
    await this.loadInstitutionTable();
  }

  async loadInstitution() {
    if (this.userPermissions.organization === null) {
      this.resultOrganization = await this.institutionService.findAllPagedByFilters(this.actualPage, this.limit);
      return this.resultOrganization;
    }

    this.resultOrganization = await this.getInstitutionById();

    return this.resultOrganization
  }

  async getInstitutionById() {
    const organizationDB = await this.institutionService.findInstituitionById(this.userPermissions.organization.id);
    return organizationDB;
  }

  async loadInstitutionTable() {
    if (this.userPermissions.organization === null) {
      let resultInstituions = await this.loadInstitution();
      this.institutionsList = resultInstituions.instituitions
      this.totalCount = resultInstituions.count;
      return;
    }

    if (this.userPermissions.organization.id) {
      let instituition = await this.loadInstitution();
      let listObject = []
      listObject.push(instituition)
      this.institutionsList = listObject;
      return;
    }

  }

  public paginatorChange($event) {
    let page = $event;
    this.actualPage = page;
    this.loadInstitutionTable();
  }

  public async confirmDelete() {
    await this.institutionService.delete(this.idInstitution);
    this.idInstitution = undefined;
    this.snackbarService.showSnackbar(Messages.institutionsDisabledSuccess);
    this.loadInstitutionTable();
  }

  public clickDelete(id: number) {
    this.type.show = true;
    this.type.title = 'Desabilitar Instituição';
    this.type.isConfirm = false;
    this.type.type = SnackConfirmEnum.delete;
    this.idInstitution = id;

    this.snackbarConfirm.typeAction(this.type);
  }

  public clickEdit(id: number) {
    let idOrganization = id;
    this.router.navigateByUrl(`/institutionsformconfig/${idOrganization}`);
  }

  ngOnDestroy() {
    this.subsSnackbar.unsubscribe();
  }
}
