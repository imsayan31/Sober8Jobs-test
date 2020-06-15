import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './employer.component';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { EmployerSubscriptionComponent } from './employer-subscription/employer-subscription.component';
import { EmployerSidebarComponent } from './employer-sidebar/employer-sidebar.component';
import { MatTreeModule, MatIconModule, MatButtonModule, MatExpansionModule } from '@angular/material';


@NgModule({
  declarations: [
    EmployerComponent,
    EmployerDashboardComponent,
    EmployerProfileComponent,
    EmployerSubscriptionComponent,
    EmployerSidebarComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class EmployerModule { }
