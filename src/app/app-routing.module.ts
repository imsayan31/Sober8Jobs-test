import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./frontend/auth/auth.module').then(m => m.AuthModule) },
  { path: 'employer', loadChildren: () => import('./frontend/employer/employer.module').then(m => m.EmployerModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
