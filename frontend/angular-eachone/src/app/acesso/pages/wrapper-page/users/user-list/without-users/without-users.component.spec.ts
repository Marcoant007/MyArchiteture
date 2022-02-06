import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutUsersComponent } from './without-users.component';

describe('WithoutUsersComponent', () => {
  let component: WithoutUsersComponent;
  let fixture: ComponentFixture<WithoutUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithoutUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
