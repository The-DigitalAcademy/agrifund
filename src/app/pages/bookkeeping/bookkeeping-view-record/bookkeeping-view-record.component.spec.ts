import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookkeepViewRecordComponent } from './bookkeeping-view-record.component';

describe('BookkeepViewRecordComponent', () => {
    let component: BookkeepViewRecordComponent;
    let fixture: ComponentFixture<BookkeepViewRecordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BookkeepViewRecordComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BookkeepViewRecordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
