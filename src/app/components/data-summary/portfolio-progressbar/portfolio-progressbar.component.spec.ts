import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioProgressbarComponent } from './portfolio-progressbar.component';

describe('PortfolioProgressbarComponent', () => {
  let component: PortfolioProgressbarComponent;
  let fixture: ComponentFixture<PortfolioProgressbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioProgressbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
