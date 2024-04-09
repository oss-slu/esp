import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { GaussianDashboardComponent } from './views/gaussianDashboard/gaussianDashboard.component';

const routes: Routes = [
  { path: 'orca', component: DashboardComponent },
  { path: 'gaussian', component: GaussianDashboardComponent },
  { path: '', redirectTo: 'orca', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
