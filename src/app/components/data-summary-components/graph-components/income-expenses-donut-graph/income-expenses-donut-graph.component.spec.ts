import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpensesDonutGraphComponent } from './income-expenses-donut-graph.component';

describe('IncomeExpensesDonutGraphComponent', () => {
    let component: IncomeExpensesDonutGraphComponent;
    let fixture: ComponentFixture<IncomeExpensesDonutGraphComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IncomeExpensesDonutGraphComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(IncomeExpensesDonutGraphComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
