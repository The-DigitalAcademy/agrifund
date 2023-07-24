import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisabledformPersonalInfoComponent } from './feature-disabledform-personal-info.component';



describe('DisabledformPersonalInfoComponent', () => {
  let component: DisabledformPersonalInfoComponent;
  let fixture: ComponentFixture<DisabledformPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisabledformPersonalInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisabledformPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
