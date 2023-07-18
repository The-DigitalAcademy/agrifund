import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableformPersonalInfoComponent } from './enableform-personal-info.component';

describe('EnableformPersonalInfoComponent', () => {
  let component: EnableformPersonalInfoComponent;
  let fixture: ComponentFixture<EnableformPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnableformPersonalInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnableformPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
