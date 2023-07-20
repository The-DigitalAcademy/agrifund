import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BookkeepViewAllComponent } from './pages/bookkeep-view-all/bookkeep-view-all.component';

@NgModule({
    declarations: [AppComponent, NavbarComponent, BookkeepViewAllComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
