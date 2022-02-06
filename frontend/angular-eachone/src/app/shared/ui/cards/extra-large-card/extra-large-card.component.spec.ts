import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraLargeCardComponent } from './extra-large-card.component';

describe('ExtraLargeCardComponent', () => {
  let component: ExtraLargeCardComponent;
  let fixture: ComponentFixture<ExtraLargeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraLargeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraLargeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
