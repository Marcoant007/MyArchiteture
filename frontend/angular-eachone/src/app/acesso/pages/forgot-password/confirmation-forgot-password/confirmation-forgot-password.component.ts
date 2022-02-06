import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password.component';

@Component({
  selector: 'app-confirmation-forgot-password',
  templateUrl: './confirmation-forgot-password.component.html',
  styleUrls: ['./confirmation-forgot-password.component.scss']
})
export class ConfirmationForgotPasswordComponent implements OnInit {

  email: string;

  constructor(
    private dialogRef: MatDialogRef<ForgotPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) { 
    this.email = data.email;
  }

  ngOnInit(): void {
  }


  public closeModal() {
    this.dialogRef.close();
  }

}
