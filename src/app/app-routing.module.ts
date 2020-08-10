import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./frontend/auth/auth.module').then(m => m.AuthModule) },
  { path: 'employer', loadChildren: () => import('./frontend/employer/employer.module').then(m => m.EmployerModule) },
  { path: 'admin', loadChildren: () => import('./admin/super-admin/super-admin.module').then(m => m.SuperAdminModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
