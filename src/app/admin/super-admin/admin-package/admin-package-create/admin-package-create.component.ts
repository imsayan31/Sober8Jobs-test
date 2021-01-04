import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-package-create',
  templateUrl: './admin-package-create.component.html',
  styleUrls: ['./admin-package-create.component.css']
})
export class AdminPackageCreateComponent implements OnInit {
  createPackageForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.createPackageForm = new FormGroup({
      package_name: new FormControl(null, {validators: [
        Validators.required
      ]}),
      package_description: new FormControl(null, {validators: [
        Validators.required
      ]}),
      package_price: new FormControl(null, { validators: [Validators.required]})
    });
  }

  onPackageCreate() {

  }

}
