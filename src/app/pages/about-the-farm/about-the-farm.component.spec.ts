import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTheFarmComponent } from './about-the-farm.component';

describe('AboutTheFarmComponent', () => {
  let component: AboutTheFarmComponent;
  let fixture: ComponentFixture<AboutTheFarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutTheFarmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutTheFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
