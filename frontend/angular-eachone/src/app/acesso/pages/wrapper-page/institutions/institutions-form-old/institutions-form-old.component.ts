import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-institutions-form-old',
  templateUrl: './institutions-form-old.component.html',
  styleUrls: ['./institutions-form-old.component.scss']
})
export class InstitutionsFormOldComponent implements OnInit {

  formGroup: FormGroup;
  hidden: boolean;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      cnpj: ['', Validators.required],
      social_name: ['', Validators.required],
      subscription_state: ['', Validators.required],
      plan: ['', Validators.required],
      phone: ['', Validators.required],
      responsible: ['', Validators.required],
      email: ['', Validators.required],
      description: [''],
    })
  }

}
