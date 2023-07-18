import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DisabledformPersonalInfoComponent } from './components/feature-disabledform-personal-info/feature-disabledform-personal-info.component';
import { EnableformPersonalInfoComponent } from './components/enableform-personal-info/enableform-personal-info.component';
import { PersonalInfoFormComponent } from './components/personal-info-form/personal-info-form.component';



@NgModule({
    declarations: [AppComponent, NavbarComponent, DisabledformPersonalInfoComponent, EnableformPersonalInfoComponent, PersonalInfoFormComponent],
    imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
