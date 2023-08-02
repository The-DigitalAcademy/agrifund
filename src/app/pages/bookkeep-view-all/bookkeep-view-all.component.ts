import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
    selector: 'app-bookkeep-view-all',
    templateUrl: './bookkeep-view-all.component.html',
    styleUrls: ['./bookkeep-view-all.component.css'],
})
export class BookkeepViewAllComponent {
    constructor(
        private router: Router,
        private _apiService: ApiService
    ) {}

    counter(i: number) {
        return new Array(i);
    }

    viewRecordDetails() {
        this.router.navigate(['bookkeep/view-record']);
    }
}
