import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisabledformPersonalInfoComponent } from './components/feature-disabledform-personal-info/feature-disabledform-personal-info.component';
import { PersonalInfoFormComponent } from './components/personal-info-form/personal-info-form.component';
import { DisabledformCropInfoComponent } from './components/disabledform-crop-info/disabledform-crop-info.component';
import { PortfolioViewInfoComponent } from './pages/portfolio-view-info/portfolio-view-info.component';


const routes: Routes = [
    {path: '',component: PersonalInfoFormComponent},
    {path: 'crop',component: DisabledformCropInfoComponent},
    {path: 'portfolio',component: PortfolioViewInfoComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
