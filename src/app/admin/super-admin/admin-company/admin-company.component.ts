import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AdminCompanyService } from './admin-company.service';

@Component({
  selector: 'app-admin-company',
  templateUrl: './admin-company.component.html',
  styleUrls: ['./admin-company.component.css']
})
export class AdminCompanyComponent implements OnInit, OnDestroy {
  getCompanies: any;
  getCompanySubscription = new Subscription();
  displayedColumns: string[] = ['company_name', 'description', 'createdDtm', 'updatedDtm', 'action'];
  dataSource: any = new MatTableDataSource();
  totalCompany = 10;
  postsPerPage = 10;
  pageSizeOptions = [5, 10, 25, 50];
  currentPage = 1;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private http: HttpClient,
    private titleService: Title,
    private companyService: AdminCompanyService
  ) {
    this.titleService.setTitle('Find Your Jobs :: Company List');
  }

  ngOnInit() {
    this.getCompanySubscription = this.companyService.getCompanies(this.postsPerPage, this.currentPage, '')
    .subscribe(companyList => {
      this.getCompanies = companyList.companyList;
      this.dataSource = companyList.companyList;
      this.totalCompany = companyList.totalCount;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.getCompanySubscription = this.companyService.getCompanies(this.postsPerPage, this.currentPage, filterValue)
    .subscribe(companyList => {
      this.getCompanies = companyList.companyList;
      this.dataSource = companyList.companyList;
      this.totalCompany = companyList.totalCount;
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.getCompanySubscription = this.companyService.getCompanies(this.postsPerPage, this.currentPage, '')
    .subscribe(companyList => {
      this.getCompanies = companyList.companyList;
      this.dataSource = companyList.companyList;
      this.totalCompany = companyList.totalCount;
    });
  }

  ngOnDestroy() {
    this.getCompanySubscription.unsubscribe();
  }

}
