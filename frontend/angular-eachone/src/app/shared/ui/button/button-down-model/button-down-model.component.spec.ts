import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDownModelComponent } from './button-down-model.component';

describe('ButtonDownModelComponent', () => {
  let component: ButtonDownModelComponent;
  let fixture: ComponentFixture<ButtonDownModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonDownModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonDownModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
