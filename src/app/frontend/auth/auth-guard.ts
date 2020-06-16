import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth-service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from './login/login.component';

@Injectable()
export class AuthGuard implements CanActivate {
  isAuthenticated: boolean;
  constructor(private authService: AuthService, private route: Router, private matDialog: MatDialog) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (!this.isAuthenticated) {
      this.route.navigate(['/']);
      this.matDialog.open(LoginComponent, {
        height: '400px',
        width: '600px',
      });
    }
    return this.isAuthenticated;
  }
}
