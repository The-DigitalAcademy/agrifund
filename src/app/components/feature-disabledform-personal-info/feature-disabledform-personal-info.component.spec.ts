import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureDisabledformPersonalInfoComponent } from './feature-disabledform-personal-info.component';

describe('FeatureDisabledformPersonalInfoComponent', () => {
  let component: FeatureDisabledformPersonalInfoComponent;
  let fixture: ComponentFixture<FeatureDisabledformPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureDisabledformPersonalInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureDisabledformPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
