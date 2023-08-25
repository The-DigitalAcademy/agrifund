import { TestBed } from '@angular/core/testing';

import { BookkeepingService } from './bookkeeping.service';

describe('BookkeepService', () => {
    let service: BookkeepingService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BookkeepingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
