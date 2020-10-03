import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { Subscription } from 'rxjs';

import { StringCompare } from 'src/app/custom-validator/string-compare.validator';

import { AdminUserService } from '../admin-users.service';
import { Loader } from '../../../../loader/loader.service';
import { DialogService } from 'src/app/message-dialog/dialog.service';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})
export class AdminUserEditComponent implements OnInit,OnDestroy {
  userId: string;
  userEditForm: FormGroup;
  userPasswordForm: FormGroup;
  updateProfileData: any;
  getUserProfileDetails = new Subscription();
  updatePasswordData: any;
  userRoles = [
    {
      slug: 'employer',
      fullname: 'Employer',
    }, {
      slug: 'job-seeker',
      fullname: 'Job Seeker',
    }, {
      slug: 'administrator',
      fullname: 'Administrator',
    }
  ];
  constructor(
    private route: ActivatedRoute,
    private adminUserService: AdminUserService,
    private loaderService: Loader,
    private dialogService: DialogService
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.userId = paramMap.get('userId');
    });

    /* Setting User Profile Values */
    this.getUserProfileDetails = this.adminUserService.getUserDetails(this.userId).subscribe(userInfoDetails => {
      this.userEditForm.setValue({
        first_name: userInfoDetails.userInfo.first_name,
        last_name: userInfoDetails.userInfo.last_name,
        email: userInfoDetails.userInfo.email,
        phone: userInfoDetails.userInfo.phone,
        fax: userInfoDetails.userInfo.fax,
        state: userInfoDetails.userInfo.state,
        city: userInfoDetails.userInfo.city,
        country: userInfoDetails.userInfo.country,
        address1: userInfoDetails.userInfo.address1,
        zipcode: (userInfoDetails.userInfo.zipcode) ? userInfoDetails.userInfo.zipcode : '',
        role: userInfoDetails.userInfo.role
      });
    });

    /* User Edit Form Set Up */
    this.userEditForm = new FormGroup({
      first_name: new FormControl(null, {validators: [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]}),
      last_name: new FormControl(null, {validators: [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      phone: new FormControl(null, {validators: [
        Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]}),
      fax: new FormControl(null, {validators: [Validators.pattern('^[0-9]*$')]}),
      country: new FormControl(null, {validators: [Validators.required]}),
      state: new FormControl(null, {validators: [Validators.required]}),
      city: new FormControl(null, {validators: [Validators.required]}),
      address1: new FormControl(null, {validators: [Validators.required]}),
      zipcode: new FormControl(null, {validators: [Validators.required]}),
      role: new FormControl(null, {validators: [Validators.required]})
    });

    /* User Change Password Form Set Up */
    this.userPasswordForm = new FormGroup({
      old_password: new FormControl(null, {validators: [Validators.required]}),
      new_password: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]}),
      confirm_password: new FormControl(null, {validators: [Validators.required]}),
    }
    , {
      validators: StringCompare('new_password', 'confirm_password')
    }
    );
  }

  /* Employer Profile Data Save */
  onEmployerProfileSave() {
    if (this.userEditForm.invalid) {
      return;
    }
    this.updateProfileData = {
      id: this.userId,
      first_name: this.userEditForm.value.first_name,
      last_name: this.userEditForm.value.last_name,
      phone: this.userEditForm.value.phone,
      fax: this.userEditForm.value.fax,
      state: this.userEditForm.value.state,
      city: this.userEditForm.value.city,
      country: this.userEditForm.value.country,
      address1: this.userEditForm.value.address1,
      zipcode: this.userEditForm.value.zipcode,
      role: this.userEditForm.value.role
    };

    this.loaderService.show();
    this.adminUserService.updateUserProfileDetails(this.updateProfileData).subscribe(updateResponse => {
      this.loaderService.hide();
      if (updateResponse.status === 200) {
        this.dialogService.showSuccessMessage(updateResponse.message);
      } else {
        this.dialogService.showErrorMessage(updateResponse.message);
      }
    });
  }

  /* Employer Password Save */
  onEmployerPasswordSave() {
    if (this.userPasswordForm.invalid) {
      return;
    }

    this.updatePasswordData = {
      id: this.userId,
      old_password: this.userPasswordForm.value.old_password,
      new_password: this.userPasswordForm.value.new_password
    };
    this.loaderService.show();
    this.adminUserService.updateUserPassword(this.updatePasswordData).subscribe(updatePassResp => {
      this.loaderService.hide();
      console.log(updatePassResp);
    });
  }

  ngOnDestroy() {
    this.getUserProfileDetails.unsubscribe();
  }

}
