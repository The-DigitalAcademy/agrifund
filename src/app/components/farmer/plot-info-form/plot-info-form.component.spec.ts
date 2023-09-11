import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotInfoFormComponent } from './plot-info-form.component';

describe('PlotInfoFormComponent', () => {
  let component: PlotInfoFormComponent;
  let fixture: ComponentFixture<PlotInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotInfoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlotInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
