import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginComponent } from '../frontend/auth/login/login.component';
import { AuthService } from '../frontend/auth/auth-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  getAuthStatus = new Subscription();
  constructor(private matDialog: MatDialog, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.autoAuthData();
    this.isAuth = this.authService.isAuthenticated();
    this.getAuthStatus = this.authService.getAuthStatus()
    .subscribe(response => {
      this.isAuth = response;
    });
  }

  openLogInDialog() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(LoginComponent, {
      height: '400px',
      width: '600px',
    });
  }

  logOut() {
    /* this.router.navigate(['/auth/signup']); */
    this.authService.logOutUser();
  }

  ngOnDestroy() {
    this.getAuthStatus.unsubscribe();
  }

}
