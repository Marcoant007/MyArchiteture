import { TestBed } from '@angular/core/testing';

import { ModalFilterService } from './modal-filter.service';

describe('ModalFilterService', () => {
  let service: ModalFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
