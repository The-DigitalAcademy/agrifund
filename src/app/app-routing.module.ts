import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisabledformPersonalInfoComponent } from './components/feature-disabledform-personal-info/feature-disabledform-personal-info.component';


const routes: Routes = [
    {path: '',component: DisabledformPersonalInfoComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
