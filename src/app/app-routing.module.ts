
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { BookkeepViewAllComponent } from './pages/bookkeep-view-all/bookkeep-view-all.component';
import { PortfolioViewInfoComponent } from './pages/portfolio-view-info/portfolio-view-info.component';
import { GetStartedPageComponent } from './pages/get-started-page/get-started-page.component';
import { BookkeepViewRecordComponent } from './pages/bookkeep-view-record/bookkeep-view-record.component';
import { PortfolioProgressbarComponent } from './components/portfolio-progressbar/portfolio-progressbar.component';
import { DisabledformFarmInfoComponent } from './components/farm-info-form/disabledform-farm-info.component';
import { EquipmentTableComponent } from './components/equipment-table/equipment-table.component';



const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'get-started', component: GetStartedPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'bookkeep', component: BookkeepViewAllComponent },
    { path: 'bookkeep/view-record', component: BookkeepViewRecordComponent },
    { path: 'portfolio', component: PortfolioViewInfoComponent },
    {path: 'progressbar',component: PortfolioProgressbarComponent},
    {path:'farm',component: DisabledformFarmInfoComponent},
    {path: 'equipment-table',component: EquipmentTableComponent},
    
    
  
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
