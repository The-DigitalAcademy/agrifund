import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyCardSummaryComponent } from './money-card-summary.component';

describe('MoneyCardSummaryComponent', () => {
  let component: MoneyCardSummaryComponent;
  let fixture: ComponentFixture<MoneyCardSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyCardSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyCardSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
