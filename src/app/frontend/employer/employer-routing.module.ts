import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployerComponent } from './employer.component';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { EmployerSubscriptionComponent } from './employer-subscription/employer-subscription.component';
import { EmployerJobsComponent } from './employer-jobs/employer-jobs.component';
import { EmployerCompanyComponent } from './employer-company/employer-company.component';
import { AuthGuard } from '../auth/auth-guard';

const routes: Routes = [
  { path: 'employer', component: EmployerComponent },
  { path: 'dashboard', component: EmployerDashboardComponent, canActivate: [AuthGuard] },
  { path: 'company', component: EmployerCompanyComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: EmployerProfileComponent, canActivate: [AuthGuard] },
  { path: 'subscription', component: EmployerSubscriptionComponent, canActivate: [AuthGuard] },
  { path: 'employer-jobs', component: EmployerJobsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class EmployerRoutingModule { }
