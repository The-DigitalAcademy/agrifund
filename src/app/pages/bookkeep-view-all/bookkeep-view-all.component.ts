import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-bookkeep-view-all',
    templateUrl: './bookkeep-view-all.component.html',
    styleUrls: ['./bookkeep-view-all.component.css'],
})
export class BookkeepViewAllComponent {
    constructor(private router: Router) {}

    counter(i: number) {
        return new Array(i);
    }

    viewRecordDetails() {
        this.router.navigate(['bookkeep/view-record']);
    }
}
