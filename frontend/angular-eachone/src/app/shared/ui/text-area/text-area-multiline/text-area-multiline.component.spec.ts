import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaMultilineComponent } from './text-area-multiline.component';

describe('TextAreaMultilineComponent', () => {
  let component: TextAreaMultilineComponent;
  let fixture: ComponentFixture<TextAreaMultilineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAreaMultilineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaMultilineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
