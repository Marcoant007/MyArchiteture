import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/acesso/services/user.service';
import AddressDTO from 'src/app/shared/dtos/AddressDTO';
import CreateUserDTO from 'src/app/shared/dtos/CreateUserDTO';
import { Messages } from 'src/app/shared/messages/Messages';
import { MessageModalService } from 'src/app/shared/ui/modal-dialog/modal-dialog/message-modal.service';
import { MessageModal } from 'src/app/shared/ui/modal-dialog/modal-dialog/messageModal';
import { SnackbarAction, SnackConfirmEnum } from 'src/app/shared/ui/modal-dialog/snackbar-confirm/snackbar-confirm.component';
import { SnackbarActionService } from 'src/app/shared/ui/modal-dialog/snackbar-confirm/snackbar-confirm.service';
import { SnackbarService } from 'src/app/shared/ui/modal-dialog/snackbar/snackbar.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public id = undefined;
  public type = new SnackbarAction();
  public subsSnackbar: Subscription;
  public title: String = "Usuários";
  public formGroup: FormGroup;
  public hidden: boolean;
  public itemsSelect: string[];
  public activeSelect: boolean;
  public disabled: boolean;
  public user: CreateUserDTO = new CreateUserDTO();
  public address: AddressDTO = new AddressDTO();
  public currentStatus: string;
  public readOnly: boolean;
  public show: boolean;
  public savedData: boolean = false;
  public isSucessMessage: boolean;
  public showConfirm: boolean = false;
  public userPermissions: any;


  @Output()
  buttonClickAllowed: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private location: Location,
    private messageModalService: MessageModalService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService,
    private snackbarConfirm: SnackbarActionService,
    private profileService: ProfileService,
  ) { 
    this.userPermissions = this.profileService.get().permissions;

  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.id = params.id;
      await this.initForm();
      if (this.id) {
        this.isView();
      }
    });
    this.subsSnackbar = this.snackbarConfirm.getObservableSnack().subscribe(actionSnackbar => {
      if (actionSnackbar.isConfirm) {
        this.confirmDelete();
      }
    })
  }

  async initForm() {
    await this.loadSelectUserType();
    await this.loadUser(this.id);
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      cpf: [this.user.cpf, Validators.required],
      registration: [this.user.registration, Validators.required],
      cellPhone: [this.user.cellPhone, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      streetName: [this.user.address?.streetName, Validators.required],
      numberAddress: [this.user.address?.numberAddress, Validators.required],
      complement: [this.user.address?.complement],
      zipCode: [this.user.address?.zipCode, Validators.required],
      userType: [this.user.userType, Validators.required],
      status: [this.user.status, Validators.required]
    });
  }

  async loadSelectUserType() {
    this.itemsSelect = await this.userService.getUserTypes();
    console.log(this.itemsSelect)
  }

  async loadUser(id: number) {
    try {
      if (!id) {
        this.user = new CreateUserDTO();
        return;
      }
      this.user = await this.userService.getById(id);

      return this.user
    } catch (error) {

      let errorMessage = error.error.message;
      let titleMessage = error.error.title;
      let isErrorMessage = true;
      let messageTime = 4100;

      let modalMessage = new MessageModal(titleMessage, errorMessage, isErrorMessage, messageTime)
      this.messageModalService.showModal(modalMessage);
    }
  }

  async submit() {
    const formIsValid = this.updateData();

    if (this.disabled) {
      this.snackbarService.showSnackbar(Messages.blockForm);
      return;
    }

    if (!formIsValid) {
      this.snackbarService.showSnackbar(Messages.invalidForm);
      return;
    }

    if (this.id) {
      await this.userService.update(this.user, this.id)
      this.location.back();
      this.snackbarService.showSnackbar(Messages.successUpdateUser);
      return;
    }

    const response = await this.userService.create(this.user);
    this.location.back();
    this.snackbarService.showSnackbar(Messages.successCreateUser);
  }

  public updateData(): boolean {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const form = this.formGroup.value;
      this.user.id = form.id;
      this.user.name = form.name;
      this.user.cpf = form.cpf;
      this.user.registration = form.registration;
      this.user.cellPhone = form.cellPhone;
      this.user.email = form.email;
      this.user.userType = form.userType;
      this.user.status = form.status;
      this.user.organization = this.userPermissions.organization;

      if (!this.user.address) {
        this.user.address = new AddressDTO();
      }

      this.user.address.streetName = form.streetName;
      this.user.address.numberAddress = form.numberAddress;
      this.user.address.complement = form.complement;
      this.user.address.zipCode = form.zipCode;

      console.log(this.user)

      return true;
    } else {
      return false;
    }
  }

  cancel() {
    this.location.back();
  }

  editMode() {
    this.buttonClickAllowed = true;
    this.isChange();
  }

  async currentStatusVerify(user: any) {
    if (user.active) {
      this.currentStatus = 'H'
    }
    if (!user.active) {
      this.currentStatus = 'D'
    }
    if (user.blocked) {
      this.currentStatus = 'B'
    }
    this.formGroup.controls['status'].setValue(this.currentStatus);
  }

  delete() {
    if (!this.disabled === false) {
      this.type.show = true;
      this.type.title = 'Confirmar Exclusão';
      this.type.isConfirm = false;
      this.type.type = SnackConfirmEnum.delete;
      this.snackbarConfirm.typeAction(this.type);
    }
  }

  async confirmDelete() {
    await this.userService.delete(this.id);
    this.snackbarService.showSnackbar(Messages.deleteUserSuccess);
    this.router.navigateByUrl("users");
  }

  isView() {
    this.currentStatusVerify(this.user);
    this.formGroup.disable();
    this.disabled = true;
  }

  isChange() {
    this.formGroup.enable();
    this.disabled = false;
  }

  clickAttach(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
    }
  }

  dragDropEvent($event) {
    console.log("drag e drop event", $event);
  }

  clickDownModel() {
    console.log("click baixar modelo de arquivo");
  }

  changeStatus($event) {
    let status = $event
    this.formGroup.controls['status'].setValue(status);

    this.user.status = status;

    return this.user.status;
  }

  selectUserType(item: string) {
    this.formGroup.controls['userType'].setValue(item);
  }

  backList() {
    this.location.back();
  }

  ngOnDestroy() {
    this.subsSnackbar.unsubscribe();
  }
}
