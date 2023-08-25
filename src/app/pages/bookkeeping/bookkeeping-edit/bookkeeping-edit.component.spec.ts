import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookkeepingEditComponent } from './bookkeeping-edit.component';

describe('BookkeepingEditComponent', () => {
    let component: BookkeepingEditComponent;
    let fixture: ComponentFixture<BookkeepingEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BookkeepingEditComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BookkeepingEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
