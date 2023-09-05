/* --------------------------------
    MODULES
---------------------------------*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {
    FontAwesomeModule,
    FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

/* --------------------------------
    INTERCEPTORS
---------------------------------*/
import { AppInterceptor } from './_helpers/interceptors/app-interceptor/app.interceptor';

/* --------------------------------
    OVERALL
---------------------------------*/
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/navigation-components/sidebar/sidebar.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { GetStartedPageComponent } from './pages/get-started-page/get-started-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { NavbarComponent } from './components/navigation-components/navbar/navbar.component';

/* --------------------------------
    USER
---------------------------------*/
import { LoginPageComponent } from './pages/user-pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/user-pages/register-page/register-page.component';
import { ForgotPasswordPageComponent } from './pages/user-pages/forgot-password-page/forgot-password-page.component';
import { ResetPasswordPageComponent } from './pages/user-pages/reset-password-page/reset-password-page.component';

/* --------------------------------
    BOOKKEEPING
---------------------------------*/
import { BookkeepingViewAllPageComponent } from './pages/bookkeeping-pages/bookkeeping-view-all-page/bookkeeping-view-all-page.component';
import { BookkeepingViewRecordPageComponent } from './pages/bookkeeping-pages/bookkeeping-view-record-page/bookkeeping-view-record-page.component';
import { BookkeepingCreatePageComponent } from './pages/bookkeeping-pages/bookkeeping-create-page/bookkeeping-create-page.component';
import { BookkeepingEditPageComponent } from './pages/bookkeeping-pages/bookkeeping-edit-page/bookkeeping-edit-page.component';

/* --------------------------------
    FARMER PORTFOLIO
---------------------------------*/
import { DisabledformPersonalInfoComponent } from './components/farmer/personal-info-form/feature-disabledform-personal-info.component';
import { EquipmentInfoComponent } from './components/farmer/equipment-info/equipment-info.component';
import { DisabledformCropInfoComponent } from './components/farmer/crop-info-form/disabledform-crop-info.component';
import { EnableformCropInfoComponent } from './components/farmer/enableform-crop-info/enableform-crop-info.component';
import { PortfolioPageComponent } from './pages/portfolio-page/portfolio-page.component';
import { FarmerPortfolioProgressbarComponent } from './components/data-summary-components/farmer-portfolio-progressbar/farmer-portfolio-progressbar.component';
import { DisabledformFarmInfoComponent } from './components/farmer/farm-info-form/disabledform-farm-info.component';
import { EquipmentTableComponent } from './components/farmer/equipment-table/equipment-table.component';
import { EquipmentCreateComponent } from './components/farmer/equipment-create/equipment-create.component';
import { EquipmentEditComponent } from './components/farmer/equipment-edit/equipment-edit.component';
import { DynamicInputsComponent } from './components/farmer/dynamic-inputs/dynamic-inputs.component';
import { AboutTheFarmComponent } from './pages/about-the-farm/about-the-farm.component';
/* --------------------------------
    DATA SUMMARY
---------------------------------*/
import { MoneyCardSummaryComponent } from './components/data-summary-components/money-card-summary/money-card-summary.component';
import { ExpensesBarChartComponent } from './components/data-summary-components/graph-components/expenses-bar-chart/expenses-bar-chart.component';
import { IncomeExpensesDonutGraphComponent } from './components/data-summary-components/graph-components/income-expenses-donut-graph/income-expenses-donut-graph.component';

/* --------------------------------
    MODALS
---------------------------------*/
import { ModalContainerComponent } from './components/modal-components/modal-container/modal-container.component';
import { BookkeepingDeleteModalContentComponent } from './components/modal-components/bookkeeping-delete-modal-content/bookkeeping-delete-modal-content.component';

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
import { OtpPageComponent } from './pages/user-pages/otp-page/otp-page.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SidebarComponent,
        LandingPageComponent,
        GetStartedPageComponent,
        DashboardPageComponent,
        RegisterPageComponent,
        LoginPageComponent,
        ForgotPasswordPageComponent,
        ResetPasswordPageComponent,
        BookkeepingViewAllPageComponent,
        BookkeepingViewRecordPageComponent,
        BookkeepingCreatePageComponent,
        BookkeepingEditPageComponent,
        PortfolioPageComponent,
        FarmerPortfolioProgressbarComponent,
        DisabledformFarmInfoComponent,
        DisabledformPersonalInfoComponent,
        DisabledformCropInfoComponent,
        EnableformCropInfoComponent,
        EquipmentInfoComponent,
        EquipmentTableComponent,
        MoneyCardSummaryComponent,
        EquipmentCreateComponent,
        ModalContainerComponent,
        EquipmentEditComponent,
        DynamicInputsComponent,
        ExpensesBarChartComponent,
        IncomeExpensesDonutGraphComponent,
        OtpPageComponent,
        AboutTheFarmComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        Ng2SearchPipeModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
    entryComponents: [BookkeepingDeleteModalContentComponent],
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
