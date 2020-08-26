import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AdminAuthService } from './admin-auth/admin-auth.service';
import { AuthService } from '../../frontend/auth/auth-service';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {

  constructor(private adminAuthService: AdminAuthService, private authService: AuthService) { }

  ngOnInit() {
  }

  /* Admin Log In */
  onAdminLogIn(loginForm: NgForm) {
  	if(loginForm.invalid) {
  		return;
  	}
  	let loginData = {email: loginForm.value.admin_email, password: loginForm.value.admin_password};
  	//this.adminAuthService.adminLogIn(loginData);
    this.authService.employerLogIn(loginData);
  }

  /* Admin Registration */
  onAdminRegistration(regForm: NgForm) {
  	if(regForm.invalid) {
  		return;
  	}
  	let regData = { email: regForm.value.admin_email, password: regForm.value.admin_password };
  	this.adminAuthService.adminSignUp(regData);

  }


}
