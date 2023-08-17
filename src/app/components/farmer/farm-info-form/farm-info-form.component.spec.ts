import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledformFarmInfoComponent } from './farm-info-form.component';

describe('DisabledformFarmInfoComponent', () => {
  let component: DisabledformFarmInfoComponent;
  let fixture: ComponentFixture<DisabledformFarmInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisabledformFarmInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisabledformFarmInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
