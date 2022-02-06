import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventsService } from 'src/app/shared/services/events.service'
import { ProfileModel } from "src/app/shared/models/profile.model";
import { ProfileService } from "src/app/shared/services/profile.service";

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  formGroup: FormGroup;
  eventsList: any[] = [];
  eventsCount: number = 0;
  profile: ProfileModel;
  page: number = 1;
  limit: number = 15;

  constructor(
    private formBuilder: FormBuilder,
    private eventsService: EventsService,
    private profileService: ProfileService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.profile = this.profileService.get();

    this.buildForm();
    await this.loadEvents();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      query: [''],
    });
  }

  async onChangePage(page: number) {
    this.page = page;
    await this.loadEvents();
  }

  async handleSearch() {
    this.page = 1;
    await this.loadEvents();
  }

  async loadEvents() {
    const query = this.formGroup.get('query').value;

    const response = await this.eventsService.findAllEventsPagedByFilters({
      page: this.page,
      limit: this.limit,
      organizationId: (this.profile.organization) ? this.profile.organization.id : null,
      query: query,
    });

    this.eventsList = response.events;
    this.eventsCount = response.count;
  }

}
