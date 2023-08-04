import { TestBed } from '@angular/core/testing';

import { BookkeepService } from './bookkeep.service';

describe('BookkeepService', () => {
    let service: BookkeepService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BookkeepService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
