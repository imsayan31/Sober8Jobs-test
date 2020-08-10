import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AdminAuthService {
	private token;
	private userRole;
	private expiresIn;
	private userId;
	private tokenTimer: any;
	private isAuth = false;
	private authStatus = new Subject<boolean>();
	constructor(private http: HttpClient, private route: Router) {}

	/* Admin Sign Up */
	adminSignUp(formData) {
		this.http.post<{ message: string, status: number}>
    ('http://localhost:3000/api/admin/user/signup', formData)
		.subscribe(response => {
			console.log(response);
		}, error => {
			console.log(error);
		});
	}

	/* Admin Log In */
	adminLogIn(formData) {
		this.http.post<{ status: number, message: string, role: string, userId: string, token: string, expiry: number }>
    ('http://localhost:3000/api/admin/user/login', formData)
		.subscribe(response => {
			const token = response.token;
			const userId = response.userId;
			const userRole = response.role;
			const expiresIn = response.expiry;
			if(token) {
				this.token = token;
				this.userId = userId;
				this.authStatus.next(true);
				this.userRole = userRole;
				this.tokenTimer = setTimeout(() => {
          this.logOutUser();
        }, expiresIn * 1000);
        const now = new Date();
        const expiryTime = new Date(now.getTime() + (expiresIn * 1000));
        this.setAuthData(token, expiryTime, userId, userRole);
				if(userRole == 'administrator') {
					this.route.navigate(['/admin/dashboard']);
				}
			}
		}, error => {
			console.log('Login failed.');
			this.authStatus.next(false);
		});
	}


  /* Log Out User */
  logOutUser() {
    this.token = null;
    this.userId = null;
    this.isAuth = false;
    this.authStatus.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.route.navigate(['/']);
  }

  /* Save Logged In User Data in Local Storage */
  private setAuthData(token: string, expiresIn: Date, userId: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expiresIn.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);
  }

  /* Clear Logged In User Data from Local Storage */
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  }

  /* Get Logged In User Data from Local Storage */
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    if (!token && !expiresIn) {
      return;
    }
    return {
      token: token,
      expiresIn: new Date(expiresIn),
      userId: userId,
      role: role
    };
  }

  /* Automatic Authentication Checking */
  autoAuthData() {
    const getAuthData = this.getAuthData();
    if (!getAuthData) {
      return;
    }
    const now = new Date();
    const expiringTime =  getAuthData.expiresIn.getTime() - now.getTime();
    console.log(getAuthData);
    if (expiringTime > 0) {
      this.token = getAuthData.token;
      this.userId = getAuthData.userId;
      this.userRole = getAuthData.role;
      this.isAuth = true;
      this.authStatus.next(true);
      this.tokenTimer = setTimeout(() => {
        this.logOutUser();
      }, expiringTime);
    }
  }

  /* Get Auth Token */
  getToken() {
    return this.token;
  }

  /* Get Current User Id */
  getUserId() {
    return this.userId;
  }

  /* Check Is User Authenticated */
  isAuthenticated() {
    return this.isAuth;
  }

  /* Get Auth Status */
  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  /* Get User Role */
  getUserRole() {
    return this.userRole;
  }
}