import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerPortfolioProgressbarComponent } from './farmer-portfolio-progressbar.component';

describe('FarmerPortfolioProgressbarComponent', () => {
    let component: FarmerPortfolioProgressbarComponent;
    let fixture: ComponentFixture<FarmerPortfolioProgressbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FarmerPortfolioProgressbarComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FarmerPortfolioProgressbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
