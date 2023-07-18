import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { TeamSectionComponent } from './components/team-section/team-section.component';
import { AboutCompanyComponent } from './components/about-company/about-company.component';

@NgModule({
    declarations: [AppComponent, NavbarComponent, LandingPageComponent, LandingPageComponent, TeamSectionComponent, AboutCompanyComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
