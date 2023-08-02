import { TestBed } from '@angular/core/testing';

import { BookkeepServiceService } from './bookkeep-service.service';

describe('BookkeepServiceService', () => {
  let service: BookkeepServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookkeepServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
