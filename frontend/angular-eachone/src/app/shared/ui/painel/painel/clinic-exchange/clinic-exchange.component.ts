import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PainelComponent } from '../painel.component'
import { ProfileService } from '../../../../services/profile.service'
import { ProfileModel } from 'src/app/shared/models/profile.model';

@Component({
  selector: 'app-clinic-exchange',
  templateUrl: './clinic-exchange.component.html',
  styleUrls: ['./clinic-exchange.component.scss']
})
export class ClinicExchangeComponent implements OnInit {

  clinics: any[]
  userProfile: ProfileModel;

  constructor(
    private dialogRef: MatDialogRef<PainelComponent>,
    private profileService: ProfileService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.userProfile = this.profileService.get();
    // this.clinics = this.userProfile.clincics;
  }


  public async handleSelectClinic(clinic: any) {
    // this.profileService.setClinic(clinic);

    await this.router.navigateByUrl(`/empresas/${this.userProfile.organization.id}/clinicas/${clinic.id}/unidades`);

    this.dialogRef.close();
  }
}
