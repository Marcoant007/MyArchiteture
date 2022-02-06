import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitScaleComponent } from './limit-scale.component';

describe('LimitScaleComponent', () => {
  let component: LimitScaleComponent;
  let fixture: ComponentFixture<LimitScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitScaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
