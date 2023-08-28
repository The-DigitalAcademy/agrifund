import { TestBed } from '@angular/core/testing';

import { OverallAppInterceptor } from './overall-app.interceptor';

describe('OverallAppInterceptor', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [OverallAppInterceptor],
        })
    );

    it('should be created', () => {
        const interceptor: OverallAppInterceptor = TestBed.inject(
            OverallAppInterceptor
        );
        expect(interceptor).toBeTruthy();
    });
});
