import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookkeepViewAllComponent } from './bookkeep-view-all.component';

describe('BookkeepViewAllComponent', () => {
  let component: BookkeepViewAllComponent;
  let fixture: ComponentFixture<BookkeepViewAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookkeepViewAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookkeepViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
