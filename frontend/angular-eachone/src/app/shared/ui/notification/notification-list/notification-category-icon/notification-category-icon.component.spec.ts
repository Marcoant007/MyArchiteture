import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationCategoryIconComponent } from './notification-category-icon.component';

describe('NotificationCategoryIconComponent', () => {
  let component: NotificationCategoryIconComponent;
  let fixture: ComponentFixture<NotificationCategoryIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationCategoryIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationCategoryIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
