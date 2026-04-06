import { TestBed } from '@angular/core/testing';

import { TokenpdateService } from './tokenpdate.service';

describe('TokenpdateService', () => {
  let service: TokenpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
