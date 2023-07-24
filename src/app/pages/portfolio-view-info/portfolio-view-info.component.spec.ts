import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioViewInfoComponent } from './portfolio-view-info.component';

describe('PortfolioViewInfoComponent', () => {
  let component: PortfolioViewInfoComponent;
  let fixture: ComponentFixture<PortfolioViewInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioViewInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioViewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
