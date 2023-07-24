import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledformCropInfoComponent } from './disabledform-crop-info.component';

describe('DisabledformCropInfoComponent', () => {
  let component: DisabledformCropInfoComponent;
  let fixture: ComponentFixture<DisabledformCropInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisabledformCropInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisabledformCropInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
