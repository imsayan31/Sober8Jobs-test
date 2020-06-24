import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

import { EmployerService } from '../employer-service';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-employer-company',
  templateUrl: './employer-company.component.html',
  styleUrls: ['./employer-company.component.css']
})
export class EmployerCompanyComponent implements OnInit {
  form: FormGroup;
  locations: FormArray;
  userId: string;
  companyData: any;
  successMsg: string;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder, private employerService: EmployerService, private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.form = this.formBuilder.group({
      company_name: ['', Validators.required],
      company_website: ['', Validators.required],
      company_desc: new FormControl(null),
      locations: this.formBuilder.array([this.createLocation()])
    })
  }

  /*  */
  get locationsArr():FormArray {
    return this.form.get('locations') as FormArray;
  }

  /* Creating New Company Address Row */
  createLocation(): FormGroup {
    return this.formBuilder.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      zipcode: ['', Validators.required]
    });
  }

  /* Add Location */
  addLocation(): void {
    this.locations = this.form.get('locations') as FormArray;
    this.locations.push(this.createLocation());
  }

  /* Remove Location */
  removeLocation(i: number) {
    this.locations.removeAt(i);
  }

  /* Employer Company Profile Update */
  onEmployerCompanySave() {
    if (this.form.invalid) {
      return;
    }
    this.companyData = {
      id: this.userId,
      company_name: this.form.value.company_name,
      company_website: this.form.value.company_website,
      company_desc: this.form.value.company_desc,
      locations: this.form.value.locations
    }
    this.employerService.updateCompanyData(this.companyData)
    .subscribe(response => {
      if (response.status === 200) {
        this.successMsg = response.message;
      } else {
        this.errorMsg = response.message;
      }
    }, error => {
        this.errorMsg = error.message;
    });
  }

}
