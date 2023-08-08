import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  UserName$!: Observable<string>;
  
  constructor(private acct: AccountService) {}

  ngOnInit(): void {
    

  this.UserName$ = this.acct.currentUserName;

  }
  // userState: String = 'notLoggedIn';

}
