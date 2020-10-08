import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminCompanyService {

  compAddr = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient, private dialogData: MatDialog) { }

  /* Get Companies */
  getCompanies(pageSize: number = null, page: number = null, searchString: string = null) {
    return this.httpClient
      .get<{ status: number, message: string, companyList: any, totalCount: number }>
      ('http://localhost:3000/api/admin-company/company-listing?pageSize=' + pageSize + '&page=' + page + '&search=' + searchString);
  }

  /* Get Company Address */
  getCompanyAddress(userId: string) {
    return this.httpClient
    .get<{ status: number, companyAddress: any }>
    ('http://localhost:3000/api/admin-company/company-address-listing?userId=' + userId);
  }

}
