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
import { AdminUserCreateComponent } from './admin-users/admin-user-create/admin-user-create.component';
import { AdminCompanyComponent } from './admin-company/admin-company.component';
import { AdminPackageCreateComponent } from './admin-package/admin-package-create/admin-package-create.component';
import { AdminPackageEditComponent } from './admin-package/admin-package-edit/admin-package-edit.component';

const routes: Routes = [
{ path: '', component: SuperAdminComponent },
{ path: 'dashboard', component: AdminDashboardComponent },
{ path: 'qualifications', component: AdminQualificationComponent },
{ path: 'skills', component: AdminSkillsComponent },
{ path: 'employment-types', component: AdminEmployementTypeComponent },
{ path: 'packages', children: [
    { path: '', component: AdminPackageComponent },
    { path: 'create', component: AdminPackageCreateComponent },
    { path: 'edit/:packageId', component: AdminPackageEditComponent }
  ]
},
{ path: 'salary-scales', component: AdminSalaryScaleComponent },
{ path: 'users', component: AdminUsersComponent },
{ path: 'company-listing', component: AdminCompanyComponent },
{ path: 'edit-users/:userId', component: AdminUserEditComponent },
{ path: 'create-user', component: AdminUserCreateComponent },
{ path: 'years-of-experience', component: AdminExperienceComponent },
{ path: 'general-settings', component: AdminGeneralSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
