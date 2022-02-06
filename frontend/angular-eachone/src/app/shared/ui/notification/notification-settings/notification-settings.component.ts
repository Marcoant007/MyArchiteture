import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActionService } from "src/app/shared/services/actions.service";
import { ContactsService } from "src/app/shared/services/contacts.service";
import { ProfileModel } from "src/app/shared/models/profile.model";
import { ProfileService } from "src/app/shared/services/profile.service";
import { MessageService } from 'src/app/shared/ui/message/message/message.service';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.scss']
})
export class NotificationSettingsComponent implements OnInit {

  formGroup: FormGroup;
  profile: ProfileModel;
  contact: any;
  actionsList: any;
  selectedActions: any[];
  breadcrumb: any[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private contactService: ContactsService,
    private actionService: ActionService,
    private messageservice: MessageService,
  ) {
    this.profile = this.profileService.get();
  }

  async ngOnInit() {
    this.loadBreadcumb();

    await this.loadActions();
    await this.loadContact();

    this.buildForm(this.contact);
  }

  loadBreadcumb() {
    this.breadcrumb = [
      {
        name: 'Configurar alertas de notificações',
        route: '',
        permission: ''
      }
    ]
  }

  buildForm(contact: any) {
    this.formGroup = this.formBuilder.group({
      email: new FormControl({
        value: contact.email || '',
        disabled: true
      },
        Validators.required),
      phone: new FormControl({
        value: contact.cellphone || '',
        disabled: true
      },
        Validators.required),
      comercialPhone: new FormControl({
        value: contact.comercialPhone || '',
        disabled: true
      },
        Validators.required),
      actions: [contact.contactHasActionList],
    });
  }

  async loadActions() {
    this.actionsList = await this.actionService.findAll();
  }

  async loadContact() {
    const response = await this.contactService.findUserContactInfo(this.profile.userId);

    if (response) {
      this.contact = response.contact;
      this.selectedActions = response.contact.contactHasActionList;
    }
  }

  getValuesFromForm() {
    const form = this.formGroup.value;

    const actionsToAdd = [];
    const actionsToRemove = [];

    form.actions.map(action => {
      actionsToAdd.push(parseInt(action))
    });

    this.selectedActions.map(action => {
      if (!form.actions.includes(String(action))) {
        actionsToRemove.push(action);
      }
    });

    form.actions.map(action => {
      if (!this.selectedActions.includes(parseInt(action))) {
        actionsToAdd.push(action);
      }
    });

    return actionsToAdd;
  }

  async submit() {
    const actionsToAdd = this.getValuesFromForm();

    await this.contactService.updateUserLinkToActions(this.profile.userId, actionsToAdd);

    this.messageservice.send({
      title: "SUCESSO!",
      message: "Alertas de notificações atualizados com sucesso",
    });

    this.goToNotifications();
  }

  cancel() {
    this.goToNotifications();
  }

  goToNotifications() {
    this.router.navigateByUrl(`notificacoes`);
  }
}
