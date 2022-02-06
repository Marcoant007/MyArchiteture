import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlarmsService } from 'src/app/shared/services/alarms.service'
import { ProfileModel } from "src/app/shared/models/profile.model";
import { ProfileService } from "src/app/shared/services/profile.service";

@Component({
  selector: 'app-alarms-list',
  templateUrl: './alarms-list.component.html',
  styleUrls: ['./alarms-list.component.scss']
})
export class AlarmsListComponent implements OnInit {

  formGroup: FormGroup;
  alarmsList: any[] = [];
  alarmsCount: number = 0;
  profile: ProfileModel;
  page: number = 1;
  limit: number = 15;

  constructor(
    private formBuilder: FormBuilder,
    private alarmsService: AlarmsService,
    private profileService: ProfileService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.profile = this.profileService.get();

    this.buildForm();
    await this.loadAlarms();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      query: [''],
    });
  }

  async onChangePage(page: number) {
    this.page = page;
    await this.loadAlarms();
  }

  async handleSearch() {
    this.page = 1;
    await this.loadAlarms();
  }

  async loadAlarms() {
    const query = this.formGroup.get('query').value;

    const response = await this.alarmsService.findAllAlarmsPagedByFilters({
      page: this.page,
      limit: this.limit,
      userId: this.profile.userId,
      organizationId: (this.profile.organization) ? this.profile.organization.id : null,
      checked: 'any', // como só vai ter esse cenário de busca, pode tirar o ternário do checked
      query: query,
    });

    this.alarmsList = response.alarms;
    this.alarmsCount = response.count;
  }

  async handleCheckAlarm(alarmId: number) {
    await this.alarmsService.checkAlarm(alarmId, this.profile.userId);

    this.loadAlarms();
  }

}
