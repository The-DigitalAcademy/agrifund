import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookkeepService } from 'src/app/services/bookkeep/bookkeep.service';

@Component({
    selector: 'app-bookkeep-delete',
    templateUrl: './bookkeep-delete.component.html',
    styleUrls: ['./bookkeep-delete.component.css'],
})
export class BookkeepDeleteComponent implements OnInit {
    id!: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        _bookkeepService: BookkeepService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
    }

    // routes back to view record page
    goBackToDetails(recordId: any) {
        // console.log(recordId);
        this.router.navigate(['bookkeep/view-record', recordId]);
    }
}
