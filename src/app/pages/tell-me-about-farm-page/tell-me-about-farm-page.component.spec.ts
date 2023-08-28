import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TellMeAboutFarmPageComponent } from './tell-me-about-farm-page.component';

describe('TellMeAboutFarmPageComponent', () => {
  let component: TellMeAboutFarmPageComponent;
  let fixture: ComponentFixture<TellMeAboutFarmPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TellMeAboutFarmPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TellMeAboutFarmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
