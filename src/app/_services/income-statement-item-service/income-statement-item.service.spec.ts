import { TestBed } from '@angular/core/testing';

import { IncomeStatementItemService } from './income-statement-item.service';

describe('BookkeepService', () => {
    let service: IncomeStatementItemService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(IncomeStatementItemService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
