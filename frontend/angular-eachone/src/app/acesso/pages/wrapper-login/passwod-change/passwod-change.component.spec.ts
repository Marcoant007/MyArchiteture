import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswodChangeComponent } from './passwod-change.component';

describe('PasswodChangeComponent', () => {
  let component: PasswodChangeComponent;
  let fixture: ComponentFixture<PasswodChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswodChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswodChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
