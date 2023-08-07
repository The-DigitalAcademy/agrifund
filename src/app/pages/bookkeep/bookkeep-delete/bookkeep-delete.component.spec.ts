import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookkeepDeleteComponent } from './bookkeep-delete.component';

describe('BookkeepDeleteComponent', () => {
  let component: BookkeepDeleteComponent;
  let fixture: ComponentFixture<BookkeepDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookkeepDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookkeepDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
