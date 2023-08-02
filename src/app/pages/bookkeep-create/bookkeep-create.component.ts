import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-bookkeep-create',
    templateUrl: './bookkeep-create.component.html',
    styleUrls: ['./bookkeep-create.component.css'],
})
export class BookkeepCreateComponent {
    constructor(private router: Router) {}

    saveRecord() {
        this.router.navigate(['bookkeep']);
    }
}
