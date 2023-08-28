import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookkeepingCreatePageComponent } from './bookkeeping-create-page.component';

describe('BookkeepingCreatePageComponent', () => {
    let component: BookkeepingCreatePageComponent;
    let fixture: ComponentFixture<BookkeepingCreatePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BookkeepingCreatePageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BookkeepingCreatePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
