import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Loader } from 'src/app/loader/loader.service';
import { DialogService } from 'src/app/message-dialog/dialog.service';
import { AdminUserService } from '../admin-users.service';

@Component({
  selector: 'app-admin-user-create',
  templateUrl: './admin-user-create.component.html',
  styleUrls: ['./admin-user-create.component.css']
})
export class AdminUserCreateComponent implements OnInit {

  userAddForm: FormGroup;
  addProfileData: any;
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
    private dialogService: DialogService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Find Your Jobs :: Add New User');
   }

  ngOnInit() {

    /* User Add Form Set Up */
    this.userAddForm = new FormGroup({
      first_name: new FormControl(null, { validators: [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z ]*$')
      ] }),
      last_name: new FormControl(null, { validators: [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')] }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      phone: new FormControl(null, {
        validators: [
          Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]
      }),
      fax: new FormControl(null, { validators: [Validators.pattern('^[0-9]*$')] }),
      country: new FormControl(null, { validators: [Validators.required] }),
      state: new FormControl(null, { validators: [Validators.required] }),
      city: new FormControl(null, { validators: [Validators.required] }),
      address1: new FormControl(null, { validators: [Validators.required] }),
      zipcode: new FormControl(null, { validators: [Validators.required] }),
      role: new FormControl(null, { validators: [Validators.required] })
    });
  }

  onEmployerProfileCreate() {
    if (this.userAddForm.invalid) {
      return;
    }
    this.addProfileData = {
      first_name: this.userAddForm.value.first_name,
      last_name: this.userAddForm.value.last_name,
      email: this.userAddForm.value.email,
      phone: this.userAddForm.value.phone,
      fax: this.userAddForm.value.fax,
      state: this.userAddForm.value.state,
      city: this.userAddForm.value.city,
      country: this.userAddForm.value.country,
      address1: this.userAddForm.value.address1,
      zipcode: this.userAddForm.value.zipcode,
      role: this.userAddForm.value.role
    };
    this.loaderService.show();
    this.adminUserService.createUserProfile(this.addProfileData).subscribe(createUserResp => {
      this.loaderService.hide();
      if (createUserResp.status === 200) {
        this.dialogService.showSuccessMessage(createUserResp.message);
      } else {
        this.dialogService.showErrorMessage(createUserResp.message);
      }
    });
  }

}
