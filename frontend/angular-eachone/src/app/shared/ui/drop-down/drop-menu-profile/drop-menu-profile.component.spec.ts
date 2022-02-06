import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropMenuProfileComponent } from './drop-menu-profile.component';

describe('DropMenuProfileComponent', () => {
  let component: DropMenuProfileComponent;
  let fixture: ComponentFixture<DropMenuProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropMenuProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropMenuProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
