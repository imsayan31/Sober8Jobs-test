import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployerComponent } from './employer.component';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { EmployerSubscriptionComponent } from './employer-subscription/employer-subscription.component';
import { AuthGuard } from '../auth/auth-guard';

const routes: Routes = [
  { path: '', component: EmployerComponent },
  { path: 'dashboard', component: EmployerDashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: EmployerProfileComponent, canActivate: [AuthGuard] },
  { path: 'subscription', component: EmployerSubscriptionComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class EmployerRoutingModule { }
