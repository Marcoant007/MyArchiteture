import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstitutionsService } from 'src/app/acesso/services/institutions.service';
import CreateUserDTO from 'src/app/shared/dtos/CreateUserDTO';
import OrganizationAdminDTO from 'src/app/shared/dtos/OrganizationDTO';
import { Messages } from 'src/app/shared/messages/Messages';
import { SnackbarService } from 'src/app/shared/ui/modal-dialog/snackbar/snackbar.service';

@Component({
  selector: 'app-institutions-form',
  templateUrl: './institutions-form.component.html',
  styleUrls: ['./institutions-form.component.scss']
})
export class InstitutionsFormComponent implements OnInit {

  public formGroup: FormGroup;
  public hidden: boolean;
  public institutions: OrganizationAdminDTO;
  public user: CreateUserDTO = new CreateUserDTO();


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private institutionService: InstitutionsService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      nameEducationalInstitution: ['', Validators.required],
      name: ['', Validators.required],
      nameUser: [''],
      email: ['', Validators.required],
      cpf: ['', Validators.required],
      userType: ["Administrador_Instituicional", Validators.required]
    })
  }

  backtoList() {
    this.router.navigateByUrl('/institutions');
  }

  async submit() {
    this.formGroup.markAllAsTouched();

    if (!this.formGroup.valid) {
      this.snackbarService.showSnackbar(Messages.invalidForm);
      return;
    }

    const formInstitutions = this.formGroup.value;
    await this.institutionService.create(formInstitutions);
    this.snackbarService.showSnackbar(Messages.successCreateInstitutions);
    this.router.navigateByUrl("institutions");
  }
}
