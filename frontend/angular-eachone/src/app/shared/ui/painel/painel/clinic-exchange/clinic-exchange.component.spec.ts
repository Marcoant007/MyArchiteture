import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicExchangeComponent } from './clinic-exchange.component';

describe('ClinicExchangeComponent', () => {
  let component: ClinicExchangeComponent;
  let fixture: ComponentFixture<ClinicExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicExchangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
