import { TestBed } from '@angular/core/testing';

import { FarmerUserService } from './farmer-user.service';

describe('FarmerUserService', () => {
  let service: FarmerUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmerUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
