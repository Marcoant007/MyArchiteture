import { TestBed } from '@angular/core/testing';
import { MenuFactory } from './menu-factory.service';


describe('MenuFactory', () => {
  let service: MenuFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
