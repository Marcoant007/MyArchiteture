import { TestBed } from '@angular/core/testing';

import { RouteUserTypeService } from './route-user-type.service';

describe('RouteUserTypeService', () => {
  let service: RouteUserTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteUserTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
