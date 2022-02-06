import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithInstitutionsComponent } from './with-institutions.component';

describe('WithInstitutionsComponent', () => {
  let component: WithInstitutionsComponent;
  let fixture: ComponentFixture<WithInstitutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithInstitutionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
