import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookkeepCreateComponent } from './bookkeep-create.component';

describe('BookkeepCreateComponent', () => {
    let component: BookkeepCreateComponent;
    let fixture: ComponentFixture<BookkeepCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BookkeepCreateComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BookkeepCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
