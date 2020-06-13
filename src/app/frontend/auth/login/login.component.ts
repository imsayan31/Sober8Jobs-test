import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private authService: AuthService) { }

  ngOnInit() {
  }

  closeLogInModal() {
    this.dialogRef.close();
  }

  onEmployerLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.employerLogIn(form.value);
    this.dialogRef.close();
  }

}
