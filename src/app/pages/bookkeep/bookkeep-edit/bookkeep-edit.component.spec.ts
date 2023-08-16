import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookkeepEditComponent } from './bookkeep-edit.component';

describe('BookkeepEditComponent', () => {
    let component: BookkeepEditComponent;
    let fixture: ComponentFixture<BookkeepEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BookkeepEditComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BookkeepEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
