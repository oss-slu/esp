import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GDashboardComponent } from './views/gaussianDashboard/gdashboard.component';

const routes: Routes = [
  { path: 'home1', component: GDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
