import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Loader } from 'src/app/loader/loader.service';
import { AdminUserService } from '../admin-users/admin-users.service';
import { AdminDashboardService } from './admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalEmployers: number;
  totalJobSeekers: number;
  totalCompanies: number;
  totalSubscriptions: string;
  constructor(
    private titleService: Title,
    private adminUserService: AdminUserService,
    private adminDashboardService: AdminDashboardService,
    private loaderService: Loader
    ) {
    this.titleService.setTitle('Find Your Jobs :: Admin Dashboard');
   }

  ngOnInit() {

    /* Get Employers */
    this.loaderService.show();
    this.adminDashboardService.getTotalEmployers().subscribe(employerQuery => {
      this.loaderService.hide();
      this.totalEmployers = employerQuery.totalUsers;
    });

    /* Get Job Seekers */
    this.adminDashboardService.getTotalJobSeekers().subscribe(employerQuery => {
      this.loaderService.hide();
      this.totalJobSeekers = employerQuery.totalUsers;
    });

    /* Get Companies */
    this.adminDashboardService.getTotalCompanies().subscribe(employerQuery => {
      this.loaderService.hide();
      this.totalCompanies = employerQuery.totalCompany;
    });
  }

}
