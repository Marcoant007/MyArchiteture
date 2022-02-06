import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InstitutionsService } from 'src/app/acesso/services/institutions.service';

@Component({
  selector: 'app-modal-table',
  templateUrl: './modal-table.component.html',
  styleUrls: ['./modal-table.component.scss']
})
export class ModalTableComponent implements OnInit {

  public users = [{
    name: 'nome',
    registration: 'dashboard',
    userType: 'anby',
    organization: {
      name: "UNIFACIG"
    },
  },{
    name: 'nome',
    registration: 'dashboard',
    userType: 'anby',
    organization: {
      name: "UNIFACIG"
    },
  }
];

  public institutionsList: any[];
  public actualPage: number = 1;
  public limit: number = 7;
  public totalCount: number = 9;
  public hasInstitutions: boolean = true;
  @Output() exitEvent = new EventEmitter<string>();

  constructor(private institutionService: InstitutionsService) { }

  async loadInstitution() {
    const response = await this.institutionService.findAllPagedByFilters(this.actualPage, this.limit);
    return response
  }

  async loadInstitutionTable() {
    let response = await this.loadInstitution();
    this.institutionsList = response.instituitions;
  }

  exit() {
    this.exitEvent.emit();
  }

  ngOnInit(): void {
    this.loadInstitutionTable();
  }

}
