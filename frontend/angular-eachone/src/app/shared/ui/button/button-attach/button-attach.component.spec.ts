import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAttachComponent } from './button-attach.component';

describe('ButtonAttachComponent', () => {
  let component: ButtonAttachComponent;
  let fixture: ComponentFixture<ButtonAttachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonAttachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAttachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
