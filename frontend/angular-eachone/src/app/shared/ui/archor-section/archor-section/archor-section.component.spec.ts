import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchorSectionComponent } from './archor-section.component';

describe('ArchorSectionComponent', () => {
  let component: ArchorSectionComponent;
  let fixture: ComponentFixture<ArchorSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchorSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
