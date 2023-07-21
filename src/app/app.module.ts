import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './pages/register/register.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { TeamSectionComponent } from './components/team-section/team-section.component';
import { AboutCompanyComponent } from './components/about-company/about-company.component';
import { BookkeepViewAllComponent } from './pages/bookkeep-view-all/bookkeep-view-all.component';
import {
    FontAwesomeModule,
    FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {
    faAddressCard,
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faArrowLeft,
    faArrowRight,
    faBars,
    faCalculator,
    faCalendar,
    faChartPie,
    faCheck,
    faCoins,
    faExternalLinkAlt,
    faFileDownload,
    faFilter,
    faHome,
    faPen,
    faPlus,
    faSave,
    faSearch,
    faTable,
    faTimes,
    faTrash,
    faUpload,
    faUser,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { DisabledformPersonalInfoComponent } from './components/feature-disabledform-personal-info/feature-disabledform-personal-info.component';
import { EnableformPersonalInfoComponent } from './components/enableform-personal-info/enableform-personal-info.component';
import { PersonalInfoFormComponent } from './components/personal-info-form/personal-info-form.component';
import { DisabledformCropInfoComponent } from './components/disabledform-crop-info/disabledform-crop-info.component';
import { EnableformCropInfoComponent } from './components/enableform-crop-info/enableform-crop-info.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { OffcanvasComponent } from './components/offcanvas/offcanvas.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { PortfolioViewInfoComponent } from './pages/portfolio-view-info/portfolio-view-info.component';
import { PortfolioProgressbarComponent } from './components/portfolio-progressbar/portfolio-progressbar.component';
import { CropInfoFormComponent } from './components/crop-info-form/crop-info-form.component';
import { GetStartedPageComponent } from './pages/get-started-page/get-started-page.component';


 
    @NgModule({
    declarations: [AppComponent, NavbarComponent, SidebarComponent, OffcanvasComponent,RegisterComponent, LoginComponent, ForgotPasswordComponent, ResetPasswordComponent,LandingPageComponent, LandingPageComponent, TeamSectionComponent, AboutCompanyComponent,DisabledformPersonalInfoComponent,EnableformPersonalInfoComponent,PersonalInfoFormComponent, DisabledformCropInfoComponent, EnableformCropInfoComponent, PortfolioViewInfoComponent, PortfolioProgressbarComponent, BookkeepViewAllComponent, CropInfoFormComponent, GetStartedPageComponent],
    imports: [BrowserModule, AppRoutingModule, FontAwesomeModule,ReactiveFormsModule, FormsModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(iconLib: FaIconLibrary) {
        iconLib.addIcons(
            faBars,
            faHome,
            faChartPie,
            faTable,
            faAddressCard,
            faCoins,
            faCalculator,
            faUsers,
            faUser,
            faArrowRight,
            faArrowLeft,
            faAngleRight,
            faAngleLeft,
            faAngleDown,
            faExternalLinkAlt,
            faSearch,
            faCalendar,
            faFilter,
            faPlus,
            faPen,
            faTrash,
            faSave,
            faUpload,
            faFileDownload,
            faTimes,
            faCheck
        );
    }
}
