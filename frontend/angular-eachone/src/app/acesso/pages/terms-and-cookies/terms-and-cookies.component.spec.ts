import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndCookiesComponent } from './terms-and-cookies.component';

describe('TermsAndCookiesComponent', () => {
  let component: TermsAndCookiesComponent;
  let fixture: ComponentFixture<TermsAndCookiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsAndCookiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
