import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../frontend/auth/auth-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  isAuth: boolean;
  getAuthStatus = new Subscription();
  public siteLogo = 'assets/images/jobs-portal.png';
  constructor(private authService: AuthService) { }

  ngOnInit() {
  	this.authService.autoAuthData();
    this.isAuth = this.authService.isAuthenticated();
    this.getAuthStatus = this.authService.getAuthStatus()
    .subscribe(response => {
      this.isAuth = response;
    });
  }

  adminLogOut() {
  	this.authService.logOutUser();
  }

  ngOnDestroy() {
    this.getAuthStatus.unsubscribe();
  }

}
