import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperAdminComponent } from './super-admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminQualificationComponent } from './admin-qualification/admin-qualification.component';
import { AdminSkillsComponent } from './admin-skills/admin-skills.component';
import { AdminEmployementTypeComponent } from './admin-employement-type/admin-employement-type.component';
import { AdminPackageComponent } from './admin-package/admin-package.component';
import { AdminSalaryScaleComponent } from './admin-salary-scale/admin-salary-scale.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminUserEditComponent } from './admin-users/admin-user-edit/admin-user-edit.component';
import { AdminExperienceComponent } from './admin-experience/admin-experience.component';
import { AdminGeneralSettingsComponent } from './admin-general-settings/admin-general-settings.component';

const routes: Routes = [
{ path: '', component: SuperAdminComponent },
{ path: 'dashboard', component: AdminDashboardComponent },
{ path: 'qualifications', component: AdminQualificationComponent },
{ path: 'skills', component: AdminSkillsComponent },
{ path: 'employment-types', component: AdminEmployementTypeComponent },
{ path: 'packages', component: AdminPackageComponent },
{ path: 'salary-scales', component: AdminSalaryScaleComponent },
{ path: 'users', component: AdminUsersComponent },
{ path: 'edit-users/:userId', component: AdminUserEditComponent },
{ path: 'years-of-experience', component: AdminExperienceComponent },
{ path: 'general-settings', component: AdminGeneralSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
