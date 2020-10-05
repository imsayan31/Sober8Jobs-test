import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminCompanyService {

  constructor(private httpClient: HttpClient) { }

  /* Get Companies */
  getCompanies(pageSize: number = null, page: number = null, searchString: string = null) {
    return this.httpClient
      .get<{ status: number, message: string, companyList: any, totalCount: number }>
      ('http://localhost:3000/api/admin-company/company-listing?pageSize=' + pageSize + '&page=' + page + '&search=' + searchString);
  }
}
