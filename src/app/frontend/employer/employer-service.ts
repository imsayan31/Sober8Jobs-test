import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(private httpClient: HttpClient) {

  }

  /* Get User Profile Details */
  getUserProfileDetails(userId: string) {
    return this.httpClient.get<{ status: number, message: string, userData: any}>('http://localhost:3000/api/user/profile/' + userId);
  }

  /* Get Company Profile Details */
  getCompanyProfileDetails(companyId: string) {
    return this.httpClient.get<{ status: number, message: string, companyData: any}>
    ('http://localhost:3000/api/user/company-profile/' + companyId);
  }

  /* Update User Profile Details */
  updateProfileData(profileData: any) {
    return this.httpClient.put<{ status: number, message: string, postData: any}>
    ('http://localhost:3000/api/user/save-profile', profileData);
  }

  /* Update Company Profile Details */
  updateCompanyData(companyData: any) {
    return this.httpClient.put<{ status: number, message: string, updatedData: any}>
    ('http://localhost:3000/api/user/save-company-profile', companyData);
  }

}
