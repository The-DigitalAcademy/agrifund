import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { UserService } from 'src/app/_services/user-service/user.service';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
    

    constructor(private _userService: UserService) {}

    ngOnInit() {
        this._userService.getFarmerByEmail();
        this._userService.user$.subscribe(user => {
            if (user) {
                console.log('User Data:', user);
                // TODO: Handle user data as needed
            }
        });
    }
}
