import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', loadChildren: () => import('./frontend/auth/auth.module').then(m => m.AuthModule) },
  { path: 'employer', loadChildren: () => import('./frontend/employer/employer.module').then(m => m.EmployerModule) },
  { path: 'admin', loadChildren: () => import('./admin/super-admin/super-admin.module').then(m => m.SuperAdminModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
