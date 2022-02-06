import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutPlanComponent } from './without-plan.component';

describe('WithoutPlanComponent', () => {
  let component: WithoutPlanComponent;
  let fixture: ComponentFixture<WithoutPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithoutPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
