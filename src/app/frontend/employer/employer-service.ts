import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(private httpClient: HttpClient) {

  }

  getUserProfileDetails(userId: string) {
    return this.httpClient.get<{ status: number, message: string, userData: any}>('http://localhost:3000/api/user/profile/' + userId);
  }

  updateProfileData(profileData: any) {
    return this.httpClient.put<{ status: number, message: string, postData: any}>
    ('http://localhost:3000/api/user/save-profile', profileData);
  }

}
