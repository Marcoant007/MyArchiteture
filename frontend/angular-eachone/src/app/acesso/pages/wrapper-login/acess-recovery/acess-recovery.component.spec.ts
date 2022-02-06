import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessRecoveryComponent } from './acess-recovery.component';

describe('AcessRecoveryComponent', () => {
  let component: AcessRecoveryComponent;
  let fixture: ComponentFixture<AcessRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcessRecoveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcessRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
