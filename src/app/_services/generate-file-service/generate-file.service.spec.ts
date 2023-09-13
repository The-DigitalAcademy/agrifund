import { TestBed } from '@angular/core/testing';

import { GenerateFileService } from './generate-file.service';

describe('GenerateFileService', () => {
    let service: GenerateFileService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GenerateFileService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
