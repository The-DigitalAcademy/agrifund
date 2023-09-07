import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesBarChartComponent } from './incomes-bar-chart.component';

describe('IncomesBarChartComponent', () => {
  let component: IncomesBarChartComponent;
  let fixture: ComponentFixture<IncomesBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomesBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomesBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
