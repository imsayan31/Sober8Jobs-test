import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-employer-company',
  templateUrl: './employer-company.component.html',
  styleUrls: ['./employer-company.component.css']
})
export class EmployerCompanyComponent implements OnInit {
  form: FormGroup;
  locations: FormArray;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  	/*this.form = new FormGroup({
  		company_name: new FormControl(null, {
  			validators: [Validators.required]
  		}),
  		company_website: new FormControl(null, {
  			validators: [Validators.required]
  		}),
  		company_desc: new FormControl(null),
  	});*/
    this.form = this.formBuilder.group({
      company_name: new FormControl(null, {
        validators: [Validators.required]
      }),
      company_website: new FormControl(null, {
        validators: [Validators.required]
      }),
      company_desc: new FormControl(null),
      locations: this.formBuilder.array([this.createLocation()])
    })
  }

  createLocation(): FormGroup {
    return this.formBuilder.group({
      country: new FormControl(null, {
        validators: [Validators.required]
      }),
      state: new FormControl(null, {
        validators: [Validators.required]
      }),
      city: new FormControl(null, {
        validators: [Validators.required]
      }),
      address: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  addLocation(): void {
    this.locations = this.form.get('locations') as FormArray;
    this.locations.push(this.createLocation());
  }

  onEmployerCompanySave() {

  }

}
