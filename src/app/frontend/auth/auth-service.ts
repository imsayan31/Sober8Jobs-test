import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  employerSignUp(formData) {
    this.http.post('http://localhost:3000/api/user/signup', formData)
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}
