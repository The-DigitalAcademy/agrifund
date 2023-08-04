import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableformCropInfoComponent } from './enableform-crop-info.component';

describe('EnableformCropInfoComponent', () => {
    let component: EnableformCropInfoComponent;
    let fixture: ComponentFixture<EnableformCropInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EnableformCropInfoComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EnableformCropInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
