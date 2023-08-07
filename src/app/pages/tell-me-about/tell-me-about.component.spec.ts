import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TellMeAboutComponent } from './tell-me-about.component';

describe('TellMeAboutComponent', () => {
  let component: TellMeAboutComponent;
  let fixture: ComponentFixture<TellMeAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TellMeAboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TellMeAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
