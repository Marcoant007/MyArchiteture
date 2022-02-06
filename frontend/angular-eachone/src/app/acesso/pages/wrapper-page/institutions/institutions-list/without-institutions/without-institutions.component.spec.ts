import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutInstitutionsComponent } from './without-institutions.component';

describe('WithoutInstitutionsComponent', () => {
  let component: WithoutInstitutionsComponent;
  let fixture: ComponentFixture<WithoutInstitutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithoutInstitutionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
