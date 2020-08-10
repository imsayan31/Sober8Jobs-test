import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './employer.component';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { EmployerSubscriptionComponent } from './employer-subscription/employer-subscription.component';
import { EmployerSidebarComponent } from './employer-sidebar/employer-sidebar.component';
import { EmployerCompanyComponent } from './employer-company/employer-company.component';
import { EmployerJobsComponent } from './employer-jobs/employer-jobs.component';
import { MatButtonModule, MatExpansionModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployerComponent,
    EmployerDashboardComponent,
    EmployerProfileComponent,
    EmployerSubscriptionComponent,
    EmployerSidebarComponent,
    EmployerCompanyComponent,
    EmployerJobsComponent,
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  providers: []
})
export class EmployerModule { }
