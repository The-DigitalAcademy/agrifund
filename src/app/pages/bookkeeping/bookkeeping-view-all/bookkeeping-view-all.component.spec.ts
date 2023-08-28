import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookkeepingViewAllComponent } from './bookkeeping-view-all.component';

describe('BookkeepingViewAllComponent', () => {
    let component: BookkeepingViewAllComponent;
    let fixture: ComponentFixture<BookkeepingViewAllComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BookkeepingViewAllComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BookkeepingViewAllComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
