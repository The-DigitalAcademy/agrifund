import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookkeepingEditPageComponent } from './bookkeeping-edit-page.component';

describe('BookkeepingEditPageComponent', () => {
    let component: BookkeepingEditPageComponent;
    let fixture: ComponentFixture<BookkeepingEditPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BookkeepingEditPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BookkeepingEditPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
