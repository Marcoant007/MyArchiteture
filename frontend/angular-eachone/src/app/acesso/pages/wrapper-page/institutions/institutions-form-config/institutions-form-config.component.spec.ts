import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsFormConfigComponent } from './institutions-form-config.component';

describe('InstitutionsFormConfigComponent', () => {
  let component: InstitutionsFormConfigComponent;
  let fixture: ComponentFixture<InstitutionsFormConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionsFormConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionsFormConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
