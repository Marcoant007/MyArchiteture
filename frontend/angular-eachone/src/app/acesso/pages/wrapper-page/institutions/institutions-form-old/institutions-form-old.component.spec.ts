import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsFormOldComponent } from './institutions-form-old.component';

describe('InstitutionsFormOldComponent', () => {
  let component: InstitutionsFormOldComponent;
  let fixture: ComponentFixture<InstitutionsFormOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionsFormOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionsFormOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
