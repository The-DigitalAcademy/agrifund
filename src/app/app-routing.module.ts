import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { ForgotPasswordComponent } from './pages/user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/user/reset-password/reset-password.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { BookkeepViewAllComponent } from './pages/bookkeep/bookkeep-view-all/bookkeep-view-all.component';
import { PortfolioViewInfoComponent } from './pages/portfolio-view-info/portfolio-view-info.component';
import { GetStartedPageComponent } from './pages/get-started-page/get-started-page.component';
import { BookkeepViewRecordComponent } from './pages/bookkeep/bookkeep-view-record/bookkeep-view-record.component';
import { PortfolioProgressbarComponent } from './components/data-summary/portfolio-progressbar/portfolio-progressbar.component';
import { DisabledformFarmInfoComponent } from './components/farmer/farm-info-form/disabledform-farm-info.component';
import { EquipmentTableComponent } from './components/farmer/equipment-table/equipment-table.component';

import { BookkeepCreateComponent } from './pages/bookkeep/bookkeep-create/bookkeep-create.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BookkeepEditComponent } from './pages/bookkeep/bookkeep-edit/bookkeep-edit.component';
import { EquipmentCreateComponent } from './components/farmer/equipment-create/equipment-create.component';
import { EquipmentEditComponent } from './components/farmer/equipment-edit/equipment-edit.component';
import { DynamicInputsComponent } from './components/farmer/dynamic-inputs/dynamic-inputs.component';
import { AboutTheFarmComponent } from './pages/about-the-farm/about-the-farm.component';


const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'get-started', component: GetStartedPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path: 'about-farm', component: AboutTheFarmComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'bookkeep', component: BookkeepViewAllComponent },
    { path: 'bookkeep/create-record', component: BookkeepCreateComponent },
    {
        path: 'bookkeep/view-record/:id',
        component: BookkeepViewRecordComponent,
    },
    { path: 'bookkeep/edit-record/:id', component: BookkeepEditComponent },
    { path: 'portfolio', component: PortfolioViewInfoComponent },
    { path: 'progressbar', component: PortfolioProgressbarComponent },
    { path: 'farm', component: DisabledformFarmInfoComponent },
    { path: 'equipment-table', component: EquipmentTableComponent },
    { path: 'equipment-create', component: EquipmentCreateComponent },
    { path: 'equipment-edit/:id', component: EquipmentEditComponent },
    { path: 'dynamic-inputs', component: DynamicInputsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
