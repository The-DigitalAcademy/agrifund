import { TestBed } from '@angular/core/testing';

import { IncomeStatementService } from './income-statement.service';

describe('BookkeepService', () => {
    let service: IncomeStatementService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(IncomeStatementService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
