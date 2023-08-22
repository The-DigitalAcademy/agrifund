import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    
    ngOnInit(): void {
        this.http
            .get('https://node-rest-66bq.onrender.com/api/book')
            .subscribe(data => console.log(data));
    }
    title = 'agrifund';

    constructor(private http: HttpClient) {}
}
