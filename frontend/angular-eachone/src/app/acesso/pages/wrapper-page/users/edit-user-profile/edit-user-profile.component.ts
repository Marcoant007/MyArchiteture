import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from 'src/app/acesso/services/user.service';
import CreateUserDTO from 'src/app/shared/dtos/CreateUserDTO';
import { ActivatedRoute } from '@angular/router';
import { MessageModalService } from 'src/app/shared/ui/modal-dialog/modal-dialog/message-modal.service';
import { MessageModal } from 'src/app/shared/ui/modal-dialog/modal-dialog/messageModal';
import { ProfileModel } from 'src/app/shared/models/profile.model';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { UserTypeEnum } from 'src/app/shared/dtos/UserTypeEnum';
import { SnackbarService } from 'src/app/shared/ui/modal-dialog/snackbar/snackbar.service';
import { Messages } from 'src/app/shared/messages/Messages';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {

  public id = undefined;
  public user: CreateUserDTO = new CreateUserDTO();
  public userProfile: string;
  private profileUser: any;
  hidden: boolean;
  formGroup: FormGroup;
  imgUrl: string;
  disabled: boolean = true;
  itemsSelect: any;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private messageService: MessageModalService,
    private profileService: ProfileService,
    private snackbarService: SnackbarService
  ) { }

  async ngOnInit() {
    await this.getProfileInfos();
    this.initForm();
  }

  async loadSelectUserType() {
    this.itemsSelect = await this.userService.getUserTypes();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      userType: [this.user.userType, Validators.required],
      email: [this.user.email, Validators.required],
      password: ['']
    })
  }

  getProfileInfos() {
    this.profileUser = this.profileService.get();
    this.id = this.profileUser.userId;
    this.user.name = this.profileUser.userName;
    this.imgUrl = this.profileUser.userImg;
    this.user.userType = <UserTypeEnum>this.profileUser.userType;
    this.user.email = this.profileUser.permissions.email;
  }

  async loadUser(id: number) {
    try {
      this.user = await this.userService.getById(id)
      return this.user
    }
    catch {

    }
  }

  async initForm() {
    await this.loadSelectUserType()
    await this.loadUser(this.id)
    this.buildForm()
    this.profileSelectControl()
  }

  public updateData() {
    this.formGroup.markAllAsTouched()
    if (this.formGroup.valid) {
      const form = this.formGroup.value;
      this.user.name = form.name;
      this.user.userType = form.userType;
      this.user.email = form.email;
      this.userService.update(this.user, this.id);

      return true
    }
    if (!this.formGroup.valid) {
      return false
    }
  }

  profileSelectControl() {
    if (this.formGroup.controls.userType.value == 'administrador' || this.formGroup.controls.userType.value == 'Administrador') {
      this.disabled = false;
    }
  }

  getId() {
    this.route.params.subscribe(async params => {
      this.id = params.id;
    })
  }

  showModal(isCorrect: boolean, titleMessage: string, contentMessage: string) {
    if (!isCorrect) {
      let title = titleMessage;
      let content = contentMessage;
      let isErrorMessage = true;
      let messageTime = 4100;
      let modalMessage = new MessageModal(
        title, content, isErrorMessage, messageTime
      )
      this.messageService.showModal(modalMessage)
    }

    if (isCorrect) {
      let title = titleMessage;
      let content = contentMessage;
      let isErrorMessage = false;
      let messageTime = 4100;
      let modalMessage = new MessageModal(
        title, content, isErrorMessage, messageTime
      )
      this.messageService.showModal(modalMessage)
    }
  }

  back() {
    this.location.back();
  }

  async submit() {
    try {
      this.formGroup.markAllAsTouched();
      if (this.formGroup.valid) {
        const form = this.formGroup.value;
        let userConfig = Object();

        userConfig.name = form.name;
        userConfig.email = form.email;
        userConfig.userType = form.userType;

        if (form.password) {
          userConfig.password = form.password;
          userConfig.isNewPassword = true;
        }

        await this.userService.configUserProfile(userConfig, this.id);
        this.back();
        this.snackbarService.showSnackbar(Messages.successConfigUserProfile);

        return
      }
    } catch (error) {
      this.showModal(false, 'Error', error.error);
    }
  }
}
