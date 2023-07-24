import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmInfoFormComponent } from './farm-info-form.component';

describe('FarmInfoFormComponent', () => {
  let component: FarmInfoFormComponent;
  let fixture: ComponentFixture<FarmInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmInfoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
