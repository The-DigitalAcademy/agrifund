import { TestBed } from '@angular/core/testing';

import { HtmltopdfService } from './htmltopdf.service';

describe('HtmltopdfService', () => {
  let service: HtmltopdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtmltopdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
