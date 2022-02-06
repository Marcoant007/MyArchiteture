import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChargesService } from 'src/app/acesso/services/charges.service';
import { InstitutionsService } from 'src/app/acesso/services/institutions.service';
import { LanguageService } from 'src/app/acesso/services/language.service';
import { UserService } from 'src/app/acesso/services/user.service';
import InstitutionConfigDTO from 'src/app/shared/dtos/InstitutionConfigDTO';
import { SnackbarService } from 'src/app/shared/ui/modal-dialog/snackbar/snackbar.service';
import { Messages } from 'src/app/shared/messages/Messages';
import { Subscription } from 'rxjs';
import { SnackbarActionService } from 'src/app/shared/ui/modal-dialog/snackbar-confirm/snackbar-confirm.service';
import { SnackbarAction, SnackConfirmEnum } from 'src/app/shared/ui/modal-dialog/snackbar-confirm/snackbar-confirm.component';

@Component({
  selector: 'app-institutions-form-config',
  templateUrl: './institutions-form-config.component.html',
  styleUrls: ['./institutions-form-config.component.scss']
})
export class InstitutionsFormConfigComponent implements OnInit {

  public idOrganization: number;
  public type = new SnackbarAction();
  public formGroup: FormGroup;
  public boxFields: FormGroup;
  public organization: InstitutionConfigDTO;
  public actualFile: any = undefined;
  public srcImage: string;
  public hasImage: boolean;
  public currentStatus: string;
  public disabled: boolean;
  public disable: boolean;
  public buttonClickAllowed: boolean;
  public subsSnackbar: Subscription;
  public list_country = [];

  public list_users = [];
  public listSearch_users = [];
  public itemsSelectUsersType = [];
  public nameUser: string = '';
  public userTypeUser: string = '';
  public pageUser: number = 1;
  public limitUser: number = 3;
  public totalCountUser: number;

  public list_charges = [];
  public itensSelectCharges = ['Valor', 'Data', 'Cartão'];
  public chargeType: string = '';
  public pageCharge: number = 1;
  public limitCharge: number = 3;
  public totalCountCharge: number;

  @Input()
  actualPage: number = 1;

  @Input()
  totalCount: number = 10;

  @Input()
  limit: number = 8;

  @Output()
  paginatorEmitter = new EventEmitter;

  breadcrumb = [{
    name: 'Instituições',
    route: 'institutions',
    permition: 'anby'
  },
  {
    name: 'Configurar Instituição',
    route: 'institutionsformconfig',
    permition: 'anby'
  }]

  archor_sections = [
    { title: 'Dados', id: 'data' },
    { title: 'Logomarca', id: 'logo' },
    { title: 'Cobranças', id: 'charge' },
    { title: 'Usuários', id: 'users' },
  ]

  public anchor = 'title'

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private organizationService: InstitutionsService,
    private snackbarService: SnackbarService,
    private snackbarConfirm: SnackbarActionService,
    private routeActived: ActivatedRoute,
    private userService: UserService,
    private languageService: LanguageService,
    private chargesService: ChargesService
  ) { }

  async ngOnInit() {
    this.routeActived.params.subscribe(async params => {
      this.idOrganization = params.id;
      await this.initForm();
      if (this.idOrganization) {
        this.isView();
      }
    })
    this.subsSnackbar = this.snackbarConfirm.getObservableSnack().subscribe(actionSnackbar => {
      if (actionSnackbar.isConfirm) {
        this.confirmDisable();
      }
    })
  }

  async initForm() {
    await this.loadOrganizationData();
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      name: [this.organization.name, Validators.required],
      companyName: [this.organization.companyName, Validators.required],
      status: [this.organization.status, Validators.required],
      cnpj: [this.organization.cnpj, Validators.required],
      plan_hired: ['Plano para digitar', Validators.required],
      stateRegistration: [this.organization.stateRegistration, Validators.required],
      responsible: [this.organization.responsible, Validators.required],
      cellPhone: [this.organization.cellPhone, Validators.required],
      email: [this.organization.email, Validators.required],
      description: [this.organization.description, Validators.required]
    })

    this.boxFields = this.formBuilder.group({
      nameSearchUser: [this.nameUser],
      userTypeSearchUser: [this.userTypeUser]
    })
  }

  isView() {
    this.currentStatusVerify(this.organization);
    this.formGroup.disable();
    this.disable = true;
  }

  disableTable() {
    if (!this.disabled) {
      this.type.show = true;
      this.type.title = 'Deseja desabilitar?';
      this.type.isConfirm = false;
      this.type.type = SnackConfirmEnum.delete;
      this.snackbarConfirm.typeAction(this.type);
    }
  }

  async confirmDisable() {
    await this.organizationService.delete(this.idOrganization);
    this.snackbarService.showSnackbar(Messages.institutionsDisabledSuccess);
    this.location.back();
  }

  async loadOrganizationData() {
    if (!this.idOrganization) {
      this.organization = new InstitutionConfigDTO();
      return
    }
    this.organization = await this.organizationService.findInstituitionById(this.idOrganization);
    this.loadAllLanguagesOrganization();
    this.tableUserLoad();
    this.tableChargesLoad();

    if (this.organization.urlLogo !== null) {
      this.srcImage = this.organization.urlLogo;
    }
  }

  async loadAllLanguagesOrganization() {
    this.list_country = await this.languageService.findLanguages();
    this.list_country.forEach((country) => {
      this.organization.languages.forEach((lang) => {
        if (country.id === lang.language.id) {
          country.active = true;
          country.hasOrganization = true;
        }
      })
    })
  }

  selectLanguage(language: any) {
    this.list_country.forEach((country) => {
      if (country === language) {
        country.active = !country.active
        if (country.hasOrganization) {
          country.deleted = !country.deleted;
        }
      }
    })
  }

  refreshLanguagesOrganization(languages: any) {
    this.list_country.forEach((country) => {
      let hasElement = languages.findIndex(el => el.language.id === country.id);
      if (hasElement === -1) {
        if (country.active) {
          let newLanguage = Object();
          newLanguage.organization_id = this.idOrganization;
          newLanguage.language = country;
          languages.push(newLanguage);
        }
      }
      if (hasElement !== -1) {
        if (country.hasOrganization && country.deleted) {
          languages[hasElement].language.active = false;
        }
      }
    })
    return languages;
  }

  //Users Functions
  async tableUserLoad() {
    this.pageUser = 1;
    this.limit = 3;
    let { users, count } = await this.userLoad();
    this.list_users = users;
    this.totalCountUser = count;
    await this.loadSelectUserType();
  }

  async userLoad() {
    return await this.userService.findUserByOrganization(this.idOrganization, this.pageUser, this.limitUser, this.nameUser, this.userTypeUser);
  }

  goToPageUser(page: number) {
    this.pageUser = page;
    this.tableUserLoad();
  }

  clickDropdownValueUser(event: any) {
    let resultUser = Array();
    resultUser.push(event);
    this.list_users = resultUser;
  }

  async loadDropSearchUser() {
    let response = await this.userLoad();
    this.listSearch_users = response.users;
  }

  async searchAutocompleteUser(name: string) {
    this.boxFields.controls['nameSearchUser'].setValue(name);
    this.boxFields.controls['userTypeSearchUser'].setValue('');
    if (name) {
      await this.loadDropSearchUser();
    }
    if (!name) {
      this.nameUser = "";
      this.userTypeUser = "";
      await this.tableUserLoad();
    }
  }

  async selectItemEvent(element: string) {
    if (this.userTypeUser === element) {
      this.userTypeUser = undefined;
    } else {
      this.userTypeUser = element
    }
    await this.tableUserLoad();
  }

  async loadSelectUserType() {
    this.itemsSelectUsersType = await this.userService.getUserTypes();
  }

  // Charges Functions
  async tableChargesLoad() {
    this.pageCharge = 1;
    this.limitCharge = 3;
    let { charges, count } = await this.chargeLoad();
    this.list_charges = charges;
    this.totalCountCharge = count;
  }

  async chargeLoad() {
    return await this.chargesService.findChargesByOrganization(this.idOrganization, this.pageCharge, this.limitCharge, this.chargeType)
  }

  async selectItemChargeEvent(element: string) {
    if (this.chargeType === element) {
      this.chargeType = undefined;
    } else {
      this.chargeType = element;
    }
    await this.tableChargesLoad();
  }

  ///
  changeStatus($event) {
    let status = $event;
    this.formGroup.controls['status'].setValue(status);

    this.organization.status = status;
  }

  saveImageLocalStorage(image: File) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      localStorage.setItem("temporary-image", reader.result.toString());
      this.srcImage = localStorage.getItem("temporary-image");
    })

    reader.readAsDataURL(image);
  }

  async currentStatusVerify(organization: any) {
    if (organization.active) {
      this.currentStatus = 'H'
    }
    if (!organization.active) {
      this.currentStatus = 'D'
    }
    this.formGroup.controls['status'].setValue(this.currentStatus);
  }

  isChange() {
    this.formGroup.enable();
    this.disable = false;
  }

  editMode() {
    this.buttonClickAllowed = true;
    this.isChange();
  }

  backToList() {
    this.location.back();
  }

  dragDropEvent($event) {
    const file = $event[0];
    this.actualFile = file;
  }

  clickAttach(event) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      this.actualFile = file;
      this.saveImageLocalStorage(file);
    }
  }

  async submit() {
    const formIsValid = await this.updateData();

    if (this.disabled) {
      this.snackbarService.showSnackbar(Messages.blockForm);
      return;
    }

    if (!formIsValid) {
      this.snackbarService.showSnackbar(Messages.invalidForm);
      return;
    }

    await this.organizationService.updateInstitution(this.idOrganization, this.organization);
    if (this.actualFile !== undefined) {
      await this.organizationService.uploadImageOrganization(this.actualFile, this.idOrganization);
    }
    this.snackbarService.showSnackbar(Messages.successUpdateInstitutions);
    this.location.back();
  }

  async updateData() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      let form = this.formGroup.value;
      this.organization.name = form.name;
      this.organization.companyName = form.companyName;
      this.organization.cnpj = form.cnpj;
      this.organization.status = form.status;
      this.organization.stateRegistration = form.stateRegistration;
      this.organization.responsible = form.responsible;
      this.organization.cellPhone = form.cellPhone;
      this.organization.email = form.email;
      this.organization.description = form.description;
      this.organization.languages = await this.refreshLanguagesOrganization(this.organization.languages);
      return true;
    } else {
      return false;
    }
  }
  ngOnDestroy() {
    this.subsSnackbar.unsubscribe();
  }
}
