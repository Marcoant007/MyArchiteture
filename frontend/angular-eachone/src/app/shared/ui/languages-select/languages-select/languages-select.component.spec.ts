import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesSelectComponent } from './languages-select.component';

describe('LanguagesSelectComponent', () => {
  let component: LanguagesSelectComponent;
  let fixture: ComponentFixture<LanguagesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagesSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
