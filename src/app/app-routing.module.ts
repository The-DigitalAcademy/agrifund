import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/user-pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/user-pages/register-page/register-page.component';
import { ForgotPasswordPageComponent } from './pages/user-pages/forgot-password-page/forgot-password-page.component';
import { ResetPasswordPageComponent } from './pages/user-pages/reset-password-page/reset-password-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PortfolioPageComponent } from './pages/portfolio-page/portfolio-page.component';
import { GetStartedPageComponent } from './pages/get-started-page/get-started-page.component';
import { FarmerPortfolioProgressbarComponent } from './components/data-summary-components/farmer-portfolio-progressbar/farmer-portfolio-progressbar.component';
import { DisabledformFarmInfoComponent } from './components/farmer/farm-info-form/disabledform-farm-info.component';
import { EquipmentTableComponent } from './components/farmer/equipment-table/equipment-table.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { EquipmentCreateComponent } from './components/farmer/equipment-create/equipment-create.component';
import { EquipmentEditComponent } from './components/farmer/equipment-edit/equipment-edit.component';
import { DynamicInputsComponent } from './components/farmer/dynamic-inputs/dynamic-inputs.component';
import { BookkeepingEditPageComponent } from './pages/bookkeeping-pages/bookkeeping-edit-page/bookkeeping-edit-page.component';
import { BookkeepingViewRecordPageComponent } from './pages/bookkeeping-pages/bookkeeping-view-record-page/bookkeeping-view-record-page.component';
import { BookkeepingViewAllPageComponent } from './pages/bookkeeping-pages/bookkeeping-view-all-page/bookkeeping-view-all-page.component';
import { BookkeepingCreatePageComponent } from './pages/bookkeeping-pages/bookkeeping-create-page/bookkeeping-create-page.component';
import { DisabledformCropInfoComponent } from './components/farmer/crop-info-form/disabledform-crop-info.component';
import { OtpPageComponent } from './pages/user-pages/otp-page/otp-page.component';

/* --------------------------------
    ACCESS GUARDS
---------------------------------*/

const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent,
        pathMatch: 'full',
    },
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    { path: 'get-started', component: GetStartedPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'forgot-password', component: ForgotPasswordPageComponent },
    { path: 'reset-password', component: ResetPasswordPageComponent },
    { path: 'dashboard', component: DashboardPageComponent },
    { path: 'bookkeeping', component: BookkeepingViewAllPageComponent },
    { path: 'otp-page', component: OtpPageComponent },
    {
        path: 'bookkeeping/create-record',
        component: BookkeepingCreatePageComponent,
    },
    {
        path: 'bookkeeping/view-record/:id',
        component: BookkeepingViewRecordPageComponent,
    },
    {
        path: 'bookkeeping/edit-record/:id',
        component: BookkeepingEditPageComponent,
    },
    { path: 'portfolio', component: PortfolioPageComponent },
    { path: 'progressbar', component: FarmerPortfolioProgressbarComponent },
    { path: 'farm', component: DisabledformFarmInfoComponent },
    { path: 'equipment-table', component: EquipmentTableComponent },
    { path: 'equipment-create', component: EquipmentCreateComponent },
    { path: 'equipment-edit/:id', component: EquipmentEditComponent },
    { path: 'dynamic-inputs', component: DynamicInputsComponent },
    {path: 'crop', component:DisabledformCropInfoComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
