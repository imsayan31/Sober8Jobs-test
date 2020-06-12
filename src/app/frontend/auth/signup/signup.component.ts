import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private matDialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
  }

  /* Open Employer Login Modal */
  openLogInDialog() {
    const dialog = new MatDialogConfig();
    this.matDialog.open(LoginComponent, {
      height: '400px',
      width: '600px',
    });
  }

  /* Employer Registration Submit */
  onEmployerSignUp(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.authService.employerSignUp(form.value);
    console.log(form.value);
  }
}
