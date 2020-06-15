import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployerComponent } from './employer.component';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { EmployerSubscriptionComponent } from './employer-subscription/employer-subscription.component';

const routes: Routes = [
  { path: '', component: EmployerComponent },
  { path: 'dashboard', component: EmployerDashboardComponent },
  { path: 'profile', component: EmployerProfileComponent },
  { path: 'subscription', component: EmployerSubscriptionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
