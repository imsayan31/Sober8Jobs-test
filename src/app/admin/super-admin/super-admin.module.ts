import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminComponent } from './super-admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MatButtonModule, MatExpansionModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/*import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';*/


@NgModule({
  declarations: [
    SuperAdminComponent,
    AdminDashboardComponent,
    /*AdminHeaderComponent,
    AdminFooterComponent,*/
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ]
})
export class SuperAdminModule { }
