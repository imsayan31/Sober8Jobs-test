import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { AdminCompanyService } from './admin-company.service';
import { Loader } from 'src/app/loader/loader.service';
import { CompanyDetailsComponent } from '../company-details/company-details.component';

@Component({
  selector: 'app-admin-company',
  templateUrl: './admin-company.component.html',
  styleUrls: ['./admin-company.component.css']
})
export class AdminCompanyComponent implements OnInit, OnDestroy {
  childCompanyAddress: any;
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
    private companyService: AdminCompanyService,
    private loaderService: Loader,
    private dialogData: MatDialog
  ) {
    this.titleService.setTitle('Find Your Jobs :: Company List');
    this.companyService.compAddr.subscribe(addr => {
      this.childCompanyAddress = addr;
    });
  }

  ngOnInit() {
    this.loaderService.show();
    this.getCompanySubscription = this.companyService.getCompanies(this.postsPerPage, this.currentPage, '')
    .subscribe(companyList => {
      this.loaderService.hide();
      this.getCompanies = companyList.companyList;
      this.dataSource = companyList.companyList;
      this.totalCompany = companyList.totalCount;
      console.log(companyList.companyList[0].company_name);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.loaderService.show();
    this.getCompanySubscription = this.companyService.getCompanies(this.postsPerPage, this.currentPage, filterValue)
    .subscribe(companyList => {
      this.loaderService.hide();
      this.getCompanies = companyList.companyList;
      this.dataSource = companyList.companyList;
      this.totalCompany = companyList.totalCount;
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.loaderService.show();
    this.getCompanySubscription = this.companyService.getCompanies(this.postsPerPage, this.currentPage, '')
    .subscribe(companyList => {
      this.loaderService.hide();
      this.getCompanies = companyList.companyList;
      this.dataSource = companyList.companyList;
      this.totalCompany = companyList.totalCount;
    });
  }

  onViewLocation(userId) {
    this.loaderService.show();
    this.companyService.getCompanyAddress(userId).subscribe(companyAddressRes => {
      this.loaderService.hide();
      this.dialogData.open(CompanyDetailsComponent, {
        width: '800px',
        panelClass: 'company-address-container',
        hasBackdrop: false,
        data: {
          message: companyAddressRes.companyAddress
        },
        position: {
          top: '2%'
        }
      });
    });
  }

  ngOnDestroy() {
    this.getCompanySubscription.unsubscribe();
  }

}
