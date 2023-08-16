import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    $userState!: any;

    constructor(private _offcanvasService: NgbOffcanvas) {}

    ngOnInit() {
        this.$userState = 'authenticated';
        // this.$userState = null;
    }

    // toggles the offcanvas visibility
    openOffcanvas(content: TemplateRef<any>) {
        this._offcanvasService.open(content, {
            backdrop: 'static',
            keyboard: false,
        });
    }
}
