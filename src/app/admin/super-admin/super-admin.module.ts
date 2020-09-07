import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
/*import { MatTableDataSource } from '@angular/material/table';*/

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminComponent } from './super-admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MatButtonModule, MatExpansionModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDividerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminQualificationComponent } from './admin-qualification/admin-qualification.component';
import { AdminIndustryComponent } from './admin-industry/admin-industry.component';
import { AdminEmployementTypeComponent } from './admin-employement-type/admin-employement-type.component';
import { AdminSpecializationComponent } from './admin-specialization/admin-specialization.component';
import { AdminExperienceComponent } from './admin-experience/admin-experience.component';
import { AdminSkillsComponent } from './admin-skills/admin-skills.component';
import { AdminSalaryScaleComponent } from './admin-salary-scale/admin-salary-scale.component';
import { AdminPackageComponent } from './admin-package/admin-package.component';
import { AdminGeneralSettingsComponent } from './admin-general-settings/admin-general-settings.component';
import { AdminUserEditComponent } from './admin-users/admin-user-edit/admin-user-edit.component';
/*import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';*/


@NgModule({
  declarations: [
    SuperAdminComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    AdminUsersComponent,
    AdminQualificationComponent,
    AdminIndustryComponent,
    AdminEmployementTypeComponent,
    AdminSpecializationComponent,
    AdminExperienceComponent,
    AdminSkillsComponent,
    AdminSalaryScaleComponent,
    AdminPackageComponent,
    AdminGeneralSettingsComponent,
    AdminUserEditComponent,
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
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule
    //MatTableDataSource
  ]
})
export class SuperAdminModule { }
