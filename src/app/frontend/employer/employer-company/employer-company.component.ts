import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';

import { EmployerService } from '../employer-service';
import { AuthService } from '../../auth/auth-service';
import { mimeType } from '../../mime-type.validator';

@Component({
  selector: 'app-employer-company',
  templateUrl: './employer-company.component.html',
  styleUrls: ['./employer-company.component.css']
})
export class EmployerCompanyComponent implements OnInit, OnDestroy {
  form: FormGroup;
  locations: FormArray;
  userId: string;
  companyData: any;
  successMsg: string;
  errorMsg: string;
  imagePreview: string;
  
  companyDetails = new Subscription();

  constructor(private formBuilder: FormBuilder, private employerService: EmployerService, private authService: AuthService) {}

  ngOnInit() {
    
    this.userId = this.authService.getUserId();
    
    this.form = this.formBuilder.group({
      company_name: ['', Validators.required],
      company_website: ['', Validators.required],
      company_desc: new FormControl(''),
      locations: this.formBuilder.array([]),
      image: new FormControl('', {
        validators: [Validators.required], asyncValidators: mimeType
      })
    });
    
    /* Get Company Details */
    this.companyDetails = this.employerService.getCompanyProfileDetails(this.userId)
    .subscribe(response => {
      for (let i = 0; i < response.companyAddress.length; i++) {
        this.locationsArr.push(this.formBuilder.group({
            country: [response.companyAddress[i].country, Validators.required],
            state: [response.companyAddress[i].state, Validators.required],
            city: [response.companyAddress[i].city, Validators.required],
            address: [response.companyAddress[i].address, Validators.required],
            zipcode: [response.companyAddress[i].zipcode, Validators.required],
        }));
      }
      this.imagePreview = response.companyInfo[0].logoPath;
      this.form.setValue({
        company_name: response.companyInfo[0].company_name,
        company_website: response.companyInfo[0].website,
        company_desc: response.companyInfo[0].description,
        /*locations: this.formBuilder.array([]),*/
        image: (response.companyInfo[0].logoPath) ? response.companyInfo[0].logoPath : null,
        locations: this.locationsArr,
      });
      
    });

  }

  /*get f() { return this.form.controls; }
  get t() { return this.f.locations as FormArray; }*/

  /*  */
  get locationsArr(): FormArray {
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
    /*console.log(this.locations);
    return;*/
    this.locations = this.form.get('locations') as FormArray;
    this.locations.removeAt(i);
  }

  /* Employer Company Profile Update */
  onEmployerCompanySave() {
    if (this.form.invalid) {
      return;
    }

    
    let saveCompanyData: any;
    if(typeof(this.form.value.image) == 'object') {
      saveCompanyData = new FormData();
      saveCompanyData.append('id', this.userId);
      saveCompanyData.append('company_name', this.form.value.company_name);
      saveCompanyData.append('company_website', this.form.value.company_website);
      saveCompanyData.append('company_desc', this.form.value.company_desc);
      saveCompanyData.append('locations', JSON.stringify(this.form.value.locations));
      saveCompanyData.append('image', this.form.value.image, this.form.value.company_name);
    } else {
      saveCompanyData = {
        id: this.userId,
        company_name: this.form.value.company_name,
        company_website: this.form.value.company_website,
        company_desc: this.form.value.company_desc,
        locations: JSON.stringify(this.form.value.locations),
        image: this.form.value.image
      };
    }
    
    this.employerService.updateCompanyData(saveCompanyData)
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

  /* Image Picker Change */
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy() {
    this.companyDetails.unsubscribe();
  }

}
