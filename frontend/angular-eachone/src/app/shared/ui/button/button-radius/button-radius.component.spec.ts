import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRadiusComponent } from './button-radius.component';

describe('ButtonRadiusComponent', () => {
  let component: ButtonRadiusComponent;
  let fixture: ComponentFixture<ButtonRadiusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonRadiusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonRadiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
