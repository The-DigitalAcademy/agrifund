import { Component } from '@angular/core';

@Component({
    selector: 'app-bookkeep-view-all',
    templateUrl: './bookkeep-view-all.component.html',
    styleUrls: ['./bookkeep-view-all.component.css'],
})
export class BookkeepViewAllComponent {
  
    counter(i: number) {
        return new Array(i);
    }
}
