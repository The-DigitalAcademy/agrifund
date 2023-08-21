import { TestBed } from '@angular/core/testing';

import { AboutTheFarmService } from './about-the-farm.service';

describe('AboutTheFarmService', () => {
  let service: AboutTheFarmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutTheFarmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
