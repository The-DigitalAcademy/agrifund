import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookkeepComponent } from './bookkeep.component';

describe('BookkeepComponent', () => {
  let component: BookkeepComponent;
  let fixture: ComponentFixture<BookkeepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookkeepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookkeepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
