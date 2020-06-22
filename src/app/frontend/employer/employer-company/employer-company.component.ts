import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-employer-company',
  templateUrl: './employer-company.component.html',
  styleUrls: ['./employer-company.component.css']
})
export class EmployerCompanyComponent implements OnInit {
  form: FormGroup;
  constructor() { }

  ngOnInit() {
  	this.form = new FormGroup({
  		company_name: new FormControl(null, {
  			validators: [Validators.required]
  		}),
  		company_website: new FormControl(null, {
  			validators: [Validators.required]
  		}),
  		company_desc: new FormControl(null),
  	});
  }

  onEmployerCompanySave() {

  }

}
