import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmsListComponent } from './alarms-list.component';

describe('AlarmsListComponent', () => {
  let component: AlarmsListComponent;
  let fixture: ComponentFixture<AlarmsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
