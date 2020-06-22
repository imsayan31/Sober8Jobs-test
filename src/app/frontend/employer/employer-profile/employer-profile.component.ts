import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth-service';
import { Subscription } from 'rxjs';
import { EmployerService } from '../employer-service';


@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.css']
})
export class EmployerProfileComponent implements OnInit, OnDestroy {
  form: FormGroup;
  userId: string;
  profileData: any;
  successMsg: string;
  errorMsg: string;
  getProfileDetails = new Subscription();

  constructor(private authService: AuthService, private employerService: EmployerService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.getProfileDetails = this.employerService.getUserProfileDetails(this.userId)
    .subscribe(response => {
      this.form.setValue({
        first_name: response.userData.first_name,
        last_name: response.userData.last_name,
        email: response.userData.email
      });
    }, error => {
      console.log(error);
    });
    this.form = new FormGroup({
      first_name: new FormControl(null, {
        validators: [Validators.required]
      }),
      last_name: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl({ value: null, disabled: true}, {
        validators: [Validators.required]
      }),
    });
  }

  onEmployerProfileSave() {
    if (this.form.invalid) {
      return;
    }
    this.profileData = {
      id: this.userId,
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name
    };
    this.employerService.updateProfileData(this.profileData)
    .subscribe(
      response => {
        if (response.status === 200) {
          this.successMsg = response.message;
        } else {
          this.errorMsg = response.message;
        }
      }, error => {
        this.errorMsg = error;
    });
  }

  ngOnDestroy() {
    this.getProfileDetails.unsubscribe();
  }

}
