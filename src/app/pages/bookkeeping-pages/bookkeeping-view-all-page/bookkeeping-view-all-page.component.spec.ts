import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookkeepingViewAllPageComponent } from './bookkeeping-view-all-page.component';

describe('BookkeepingViewAllPageComponent', () => {
    let component: BookkeepingViewAllPageComponent;
    let fixture: ComponentFixture<BookkeepingViewAllPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BookkeepingViewAllPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BookkeepingViewAllPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
