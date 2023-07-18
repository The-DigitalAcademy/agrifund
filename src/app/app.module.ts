import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule, FaIconLibrary} from '@fortawesome/angular-fontawesome';
import { faCalendar, faPlus, faTable } from '@fortawesome/free-solid-svg-icons';

@NgModule({
    declarations: [AppComponent, NavbarComponent],
    imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(iconLib: FaIconLibrary){
        iconLib.addIcons(faPlus, faCalendar, faTable);
    }
}
