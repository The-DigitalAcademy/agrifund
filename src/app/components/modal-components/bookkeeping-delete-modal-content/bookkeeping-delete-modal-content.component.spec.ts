import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookkeepingDeleteModalContentComponent } from './bookkeeping-delete-modal-content.component';

describe('DeleteModalContentComponent', () => {
    let component: BookkeepingDeleteModalContentComponent;
    let fixture: ComponentFixture<BookkeepingDeleteModalContentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BookkeepingDeleteModalContentComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(
            BookkeepingDeleteModalContentComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
