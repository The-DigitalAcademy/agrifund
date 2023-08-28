/* --------------------------------
    MODULES
---------------------------------*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {
    FontAwesomeModule,
    FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

/* --------------------------------
    OVERALL
---------------------------------*/
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/navigation/sidebar/sidebar.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { GetStartedPageComponent } from './pages/get-started-page/get-started-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';

/* --------------------------------
    USER
---------------------------------*/
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { ForgotPasswordComponent } from './pages/user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/user/reset-password/reset-password.component';

/* --------------------------------
    BOOKKEEP 
---------------------------------*/
import { BookkeepingViewAllComponent } from './pages/bookkeeping/bookkeeping-view-all/bookkeeping-view-all.component';
import { BookkeepingViewRecordComponent } from './pages/bookkeeping/bookkeeping-view-record/bookkeeping-view-record.component';
import { BookkeepingCreateComponent } from './pages/bookkeeping/bookkeeping-create/bookkeeping-create.component';
import { BookkeepingEditComponent } from './pages/bookkeeping/bookkeeping-edit/bookkeeping-edit.component';

/* --------------------------------
    PORTFOLIO
---------------------------------*/
import { DisabledformPersonalInfoComponent } from './components/farmer/personal-info-form/feature-disabledform-personal-info.component';
import { EquipmentInfoComponent } from './components/farmer/equipment-info/equipment-info.component';
import { DisabledformCropInfoComponent } from './components/farmer/crop-info-form/disabledform-crop-info.component';
import { EnableformCropInfoComponent } from './components/farmer/enableform-crop-info/enableform-crop-info.component';
import { PortfolioViewInfoComponent } from './pages/portfolio-view-info/portfolio-view-info.component';
import { PortfolioProgressbarComponent } from './components/data-summary/portfolio-progressbar/portfolio-progressbar.component';
import { DisabledformFarmInfoComponent } from './components/farmer/farm-info-form/disabledform-farm-info.component';
import { EquipmentTableComponent } from './components/farmer/equipment-table/equipment-table.component';
import { EquipmentCreateComponent } from './components/farmer/equipment-create/equipment-create.component';

/* --------------------------------
    DATA SUMMARY
---------------------------------*/
import { MoneyCardSummaryComponent } from './components/data-summary/money-card-summary/money-card-summary.component';
import { BarChartComponent } from './components/data-summary/graph/bar-chart/bar-chart.component';
import { DonutGraphComponent } from './components/data-summary/graph/donut-graph/donut-graph.component';

/* --------------------------------
    MODALS
---------------------------------*/
import { ModalContainerComponent } from './components/modal/modal-container/modal-container.component';
import { BookkeepingDeleteModalContentComponent } from './components/modal/bookkeeping-delete-modal-content/bookkeeping-delete-modal-content.component';

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
import { EquipmentEditComponent } from './components/farmer/equipment-edit/equipment-edit.component';
import { DynamicInputsComponent } from './components/farmer/dynamic-inputs/dynamic-inputs.component';
import { AboutTheFarmComponent } from './pages/farm/about-the-farm/about-the-farm.component';
import { CreateAssetComponent } from './pages/farm/create-asset/create-asset.component';

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
        BookkeepingViewAllComponent,
        BookkeepingViewRecordComponent,
        BookkeepingCreateComponent,
        BookkeepingEditComponent,
        PortfolioViewInfoComponent,
        PortfolioProgressbarComponent,
        DisabledformFarmInfoComponent,
        DisabledformPersonalInfoComponent,
        DisabledformCropInfoComponent,
        EnableformCropInfoComponent,
        EquipmentInfoComponent,
        EquipmentTableComponent,
        MoneyCardSummaryComponent,
        AboutTheFarmComponent,
        EquipmentCreateComponent,
        ModalContainerComponent,
        EquipmentEditComponent,
        DynamicInputsComponent,
        BarChartComponent,
        DonutGraphComponent,
        AboutTheFarmComponent,
        CreateAssetComponent,
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
    providers: [],
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
