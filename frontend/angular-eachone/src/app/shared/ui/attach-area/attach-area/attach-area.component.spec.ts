import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachAreaComponent } from './attach-area.component';

describe('AttachAreaComponent', () => {
  let component: AttachAreaComponent;
  let fixture: ComponentFixture<AttachAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
