import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationForgotPasswordComponent } from './confirmation-forgot-password.component';

describe('ConfirmationForgotPasswordComponent', () => {
  let component: ConfirmationForgotPasswordComponent;
  let fixture: ComponentFixture<ConfirmationForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationForgotPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
