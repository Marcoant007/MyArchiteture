import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CockpitProfileComponent } from './cockpit-profile.component';

describe('CockpitProfileComponent', () => {
  let component: CockpitProfileComponent;
  let fixture: ComponentFixture<CockpitProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CockpitProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CockpitProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
