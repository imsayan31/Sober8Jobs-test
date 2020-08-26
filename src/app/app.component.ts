import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './frontend/auth/auth-service';
import { AdminAuthService } from './admin/super-admin/admin-auth/admin-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Find Your Jobs';
  isAuth: boolean;
  userRole: string;
  getAuthStatus = new Subscription();
  constructor(private authService: AuthService, private adminAuthService: AdminAuthService) {

  }

  ngOnInit() {

    this.isAuth = this.authService.isAuthenticated();
    this.getAuthStatus = this.authService.getAuthStatus()
    .subscribe(successMsg => {
      this.isAuth = successMsg;
      this.userRole = this.authService.getUserRole();
    }, errorMsg => {

    });
  	
  	/*this.getAdminAuthStatus = this.adminAuthService.getAuthStatus()
  	.subscribe(successMsg => {
  		this.isAdminAuth = successMsg;
  		console.log('Admin: ' + this.isAdminAuth);
  	}, errorMsg => {

  	});*/
  }


  ngOnDestroy(){
  	this.getAuthStatus.unsubscribe();
  }
}
