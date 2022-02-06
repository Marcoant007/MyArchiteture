import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperLoginComponent } from './wrapper-login.component';

describe('WrapperLoginComponent', () => {
  let component: WrapperLoginComponent;
  let fixture: ComponentFixture<WrapperLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
