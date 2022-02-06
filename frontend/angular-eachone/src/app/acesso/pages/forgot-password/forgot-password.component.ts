import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../wrapper-login/login/login.component';
import { ConfirmationForgotPasswordComponent } from './confirmation-forgot-password/confirmation-forgot-password.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  async submit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const form = this.formGroup.value;
      const email = form.email;

      await this.authService.forgotPassword(email);

      const dialogRef = this.dialog.open(ConfirmationForgotPasswordComponent, {
        autoFocus: false,
        maxHeight: '95%',
        panelClass: 'app-modal-forgot',
        data: {
          "email": email,
        }
      });
    }
  }


  public closeModal() {
    this.dialogRef.close();
  }

}
