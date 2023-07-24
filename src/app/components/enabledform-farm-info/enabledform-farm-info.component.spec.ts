import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnabledformFarmInfoComponent } from './enabledform-farm-info.component';

describe('EnabledformFarmInfoComponent', () => {
  let component: EnabledformFarmInfoComponent;
  let fixture: ComponentFixture<EnabledformFarmInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnabledformFarmInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnabledformFarmInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
