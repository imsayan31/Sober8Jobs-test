import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  constructor(private httpClient: HttpClient) { }

  /* Get Total Employers */
  getTotalEmployers() {
    return this.httpClient
      .get<{ status: number, totalUsers: number }>('http://localhost:3000/api/admin-dashboard/get-users?role=employer');
  }

  /* Get Total Job Seekers */
  getTotalJobSeekers() {
    return this.httpClient
      .get<{ status: number, totalUsers: number }>('http://localhost:3000/api/admin-dashboard/get-users?role=job-seeker');
  }

  /* Get Total Companies */
  getTotalCompanies() {
    return this.httpClient
      .get<{ status: number, totalCompany: number }>('http://localhost:3000/api/admin-dashboard/get-companies');
  }

  /* Get Total Subscriptions */
  /* Get Total Jobs */
  /* Get Total Job Applications */
}
