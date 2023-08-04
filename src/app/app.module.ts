/* --------------------------------
    MODULES
---------------------------------*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {
    FontAwesomeModule,
    FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

/* --------------------------------
    OVERALL
---------------------------------*/
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { GetStartedPageComponent } from './pages/get-started-page/get-started-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
/* --------------------------------
    USER
---------------------------------*/
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

/* --------------------------------
    BOOKKEEP 
---------------------------------*/
import { BookkeepViewAllComponent } from './pages/bookkeep/bookkeep-view-all/bookkeep-view-all.component';
import { BookkeepViewRecordComponent } from './pages/bookkeep/bookkeep-view-record/bookkeep-view-record.component';
import { BookkeepCreateComponent } from './pages/bookkeep/bookkeep-create/bookkeep-create.component';
import { BookkeepEditComponent } from './pages/bookkeep/bookkeep-edit/bookkeep-edit.component';
/* --------------------------------
    PORTFOLIO
---------------------------------*/
import { DisabledformPersonalInfoComponent } from './components/personal-info-form/feature-disabledform-personal-info.component';
import { EquipmentInfoComponent } from './components/equipment-info/equipment-info.component';
import { DisabledformCropInfoComponent } from './components/crop-info-form/disabledform-crop-info.component';
import { EnableformCropInfoComponent } from './components/enableform-crop-info/enableform-crop-info.component';
import { PortfolioViewInfoComponent } from './pages/portfolio-view-info/portfolio-view-info.component';
import { PortfolioProgressbarComponent } from './components/portfolio-progressbar/portfolio-progressbar.component';
import { DisabledformFarmInfoComponent } from './components/farm-info-form/disabledform-farm-info.component';
import { EquipmentTableComponent } from './components/equipment-table/equipment-table.component';

/* --------------------------------
    ICONS
---------------------------------*/
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

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SidebarComponent,
        LandingPageComponent,
        GetStartedPageComponent,
        DashboardComponent,
        RegisterComponent,
        LoginComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        BookkeepViewAllComponent,
        BookkeepViewRecordComponent,
        BookkeepCreateComponent,
        BookkeepEditComponent,
        PortfolioViewInfoComponent,
        PortfolioProgressbarComponent,
        DisabledformFarmInfoComponent,
        DisabledformPersonalInfoComponent,
        DisabledformCropInfoComponent,
        EnableformCropInfoComponent,
        EquipmentInfoComponent,
        EquipmentTableComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
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
