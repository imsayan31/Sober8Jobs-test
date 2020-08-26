import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: string;
  private token: string;
  private isAuth = false;
  private tokenTimer: any;
  private authStatus = new Subject<boolean>();
  private currentUserRole = 'Hii';

  constructor(private http: HttpClient, private router: Router) {}

  /* Employer Sign Up */
  employerSignUp(formData) {
    this.http.post<{ message: string, status: number }>('http://localhost:3000/api/user/signup', formData)
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  /* Employer Log In */
  employerLogIn(formData) {
    this.http.post <{ status: number, message: string, role: string, userId: string, token: string, expiry: number}>
    ('http://localhost:3000/api/user/login', formData)
    .subscribe(response => {
      const token = response.token;
      const userId = response.userId;
      const expiresIn = response.expiry;
      const role = response.role;
      if (token) {
        this.token = token;
        this.userId = userId;
        this.currentUserRole = role;
        this.isAuth = true;
        this.authStatus.next(true);
        this.tokenTimer = setTimeout(() => {
          this.logOutUser();
        }, expiresIn * 1000);
        const now = new Date();
        const expiryTime = new Date(now.getTime() + (expiresIn * 1000));
        this.setAuthData(token, expiryTime, userId, role);
        if (response.role === 'employer') {
          this.router.navigate(['/employer/dashboard']);
        } else if (response.role === 'administrator') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      }
    }, error => {
      console.log(error);
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
    this.router.navigate(['/']);
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

    if (expiringTime > 0) {
      this.token = getAuthData.token;
      this.userId = getAuthData.userId;
      this.currentUserRole = getAuthData.role;
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
    return this.currentUserRole;
  }
}
