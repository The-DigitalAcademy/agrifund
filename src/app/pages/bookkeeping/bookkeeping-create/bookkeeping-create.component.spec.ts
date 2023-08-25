import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookkeepingCreateComponent } from './bookkeeping-create.component';

describe('BookkeepingCreateComponent', () => {
    let component: BookkeepingCreateComponent;
    let fixture: ComponentFixture<BookkeepingCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BookkeepingCreateComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BookkeepingCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
