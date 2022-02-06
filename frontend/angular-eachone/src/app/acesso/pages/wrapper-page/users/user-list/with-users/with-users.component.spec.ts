import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithUsersComponent } from './with-users.component';

describe('WithUsersComponent', () => {
  let component: WithUsersComponent;
  let fixture: ComponentFixture<WithUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
