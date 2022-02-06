import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRegisterComponent } from './input-register.component';

describe('InputRegisterComponent', () => {
  let component: InputRegisterComponent;
  let fixture: ComponentFixture<InputRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
