import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithPlanComponent } from './with-plan.component';

describe('WithPlanComponent', () => {
  let component: WithPlanComponent;
  let fixture: ComponentFixture<WithPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
