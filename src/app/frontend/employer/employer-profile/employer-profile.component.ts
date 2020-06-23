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
        email: response.userData.email,
        phone: response.userData.phone,
        fax: response.userData.fax,
        state: response.userData.state,
        city: response.userData.city,
        country: response.userData.country,
        address1: response.userData.address1,
        zipcode: (response.userData.zipcode) ? response.userData.zipcode : ''
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
      phone: new FormControl({ value: null}, {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      }),
      fax: new FormControl({ value: null}),
      country: new FormControl({ value: null}, {
        validators: [Validators.required]
      }),
      state: new FormControl({ value: null}, {
        validators: [Validators.required]
      }),
      city: new FormControl({ value: null}, {
        validators: [Validators.required]
      }),
      address1: new FormControl({ value: null}, {
        validators: [Validators.required]
      }),
      zipcode: new FormControl({ value: null}, {
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
      last_name: this.form.value.last_name,
      phone: this.form.value.phone,
      fax: this.form.value.fax,
      state: this.form.value.state,
      city: this.form.value.city,
      country: this.form.value.country,
      address1: this.form.value.address1,
      zipcode: this.form.value.zipcode
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
