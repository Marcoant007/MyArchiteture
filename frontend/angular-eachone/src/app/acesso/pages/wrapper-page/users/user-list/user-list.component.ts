import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/acesso/services/user.service';
import CreateUserDTO from 'src/app/shared/dtos/CreateUserDTO';
import { Messages } from 'src/app/shared/messages/Messages';
import { UserXLS } from 'src/app/shared/models/userXLS';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { PrintService } from 'src/app/shared/services/print.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { SnackbarAction, SnackConfirmEnum } from 'src/app/shared/ui/modal-dialog/snackbar-confirm/snackbar-confirm.component';
import { SnackbarActionService } from 'src/app/shared/ui/modal-dialog/snackbar-confirm/snackbar-confirm.service';
import { SnackbarService } from 'src/app/shared/ui/modal-dialog/snackbar/snackbar.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public user: CreateUserDTO;
  public users: any[];
  public userNotExists: any;
  public resultUser: any;
  public formGroup: FormGroup;
  public actualPage: number = 1;
  public limit: number = 8;
  public totalCount: number;
  public usersList: any;
  public itemsSelect: string;
  public hasUsers: boolean = true;
  public type = new SnackbarAction();
  public idDelete: number;
  public subsSnackbar: Subscription;
  public userPermissions: any;
  public userName: string;
  public userId: number;
  public typeUser: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private excelService: ExcelService,
    private printService: PrintService,
    private snackbarConfirm: SnackbarActionService,
    private snackbarService: SnackbarService,
    private profileService: ProfileService,
  ) {

    this.userName = this.profileService.get().userName;
    this.userId = this.profileService.get().userId;
    this.typeUser = this.profileService.get().userType;
    this.userPermissions = this.profileService.get().permissions;

  }

  async ngOnInit() {
    this.subsSnackbar = this.snackbarConfirm.getObservableSnack().subscribe(actionSnackbar => {
      if (actionSnackbar.isConfirm) {
        this.confirmDelete();
      }
    })
    this.buildForm();

    this.loadSelectUserType();
    await this.loadUserTable();
  }

  async buildForm() {
    this.formGroup = this.formBuilder.group({
      name: [''],
      userType: ['']
    })
  }

  async loadSelectUserType() {
    this.itemsSelect = await this.userService.getUserTypes();
  }

  async loadUser() {

    const name = this.formGroup.get('name').value;
    const userType = this.formGroup.get('userType').value;
    let params = {
      name: name,
      userType: userType
    }

    if (this.userPermissions.organization === null) {
      this.resultUser = await this.userService.findAllPagedByFilters(this.actualPage, this.limit, params);
      return this.resultUser
    }

    // if(this.user.userType == "Professor"){
    //   const aluno = params.userType = "Aluno";
    //   this.resultUser = await this.userService.findAllPagedByFilters(this.actualPage, this.limit, aluno)
    // }

    this.resultUser = await this.getUserByOrganization();

    console.log(this.resultUser.users)

    return this.resultUser;
  }

  async getUserByOrganization() {
    const response = await this.userService.findUserByOrganization(this.userPermissions.organization.id, this.actualPage, this.limit, '', '')
    return response
  }

  async loadUserTable() {
    let response = await this.loadUser();
    this.users = response.users;

    this.userNotExists = this.users.length == 0
    if (this.userNotExists) {
      return
    }

    this.totalCount = response.count;
    if (this.totalCount === 0) {
      this.hasUsers = false;
    }
  }

  async loadDropdownSearch() {
    let response = await this.loadUser();
    this.usersList = response.users;
  }

  async paginatorChange($event) {
    let page = $event;
    this.actualPage = page;
    this.loadUserTable();
  }

  async searchAutocomplete(name: string) {
    this.formGroup.controls['name'].setValue(name);
    this.formGroup.controls['userType'].setValue("");
    if (name) {
      await this.loadDropdownSearch();
    }
    if (!name) {
      await this.loadUserTable();
    }
  }


  delete(id: number) {
    this.type.show = true;
    this.type.title = 'Confirmar Exclusão';
    this.type.isConfirm = false;
    this.type.type = SnackConfirmEnum.delete;
    this.idDelete = id;

    this.snackbarConfirm.typeAction(this.type);
  }

  async confirmDelete() {
    await this.userService.delete(this.idDelete);
    this.idDelete = undefined;
    this.snackbarService.showSnackbar(Messages.deleteUserSuccess);
    this.loadUserTable();
  }

  async selectItemEvent(userType: string) {
    this.formGroup.controls['userType'].setValue(userType);
    this.loadUserTable();
  }

  exportUserExcell() {
    const userXSL = this.users.map(user => new UserXLS(user));
    this.excelService.exportAsExcelFile(userXSL, "Lista de usuários");
  }

  printUser() {
    this.printService.printDocument('Lista de usuários', this.users)
  }

  ngOnDestroy() {
    this.subsSnackbar.unsubscribe();
  }
}
