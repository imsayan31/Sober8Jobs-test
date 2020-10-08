import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  companyAddress: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialgRef: MatDialogRef<CompanyDetailsComponent>) {
  }

  ngOnInit() {
    this.companyAddress = this.data.message;
  }

  closeAddressDialog() {
    this.dialgRef.close();
  }

}
