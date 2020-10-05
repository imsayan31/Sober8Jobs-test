import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material';

import { AdminUserService } from './admin-users.service';
import { map, tap } from 'rxjs/operators';

export interface UserData {
  name: string,
  email: string,
  role: string,
  createdDtm: Date,
  updatedDtm: Date
}

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit, OnDestroy {

  getUsersSubscription = new Subscription();
  getUsers: any;
  displayedColumns: string[] = ['name', 'email', 'role', 'createdDtm', 'updatedDtm', 'action'];
  dataSource: any = new MatTableDataSource();
  totalUsers = 10;
  postsPerPage = 10;
  pageSizeOptions = [5, 10, 25, 50];
  currentPage = 1;
  height = '100';
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private http: HttpClient, private titleService: Title, private adminUserService: AdminUserService) {
    this.titleService.setTitle('Find Your Jobs :: Users List');
  /* this.dataSource = new MatTableDataSource(this.getUsers); */
  }

  ngOnInit() {
    this.getUsersSubscription = this.adminUserService.getUsers(this.postsPerPage, this.currentPage, '')
    .pipe(map(currResp => {
      const userListResp = {
        totalCount: currResp.totalCount,
        usersList: []
      };
      const newUserArr = currResp.usersList.map((item) => {
        const mappedUser = {
          _id: item._id,
          first_name: item.first_name,
          last_name: item.last_name,
          email: item.email,
          role: item.role === 'job-seeker' ? 'Job Seeker' : item.role,
          createdDtm: item.createdDtm,
          updatedDtm: item.updatedDtm,
        };
        return mappedUser;
      });
      userListResp.usersList = newUserArr;
      return userListResp;
    }))
    .subscribe(response => {
    this.getUsers = response.usersList;
    this.dataSource = response.usersList;
    this.totalUsers = response.totalCount;
    });
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.getUsersSubscription = this.adminUserService.getUsers(this.postsPerPage, this.currentPage, filterValue)
      .pipe(map(currResp => {
        const userListResp = {
          totalCount: currResp.totalCount,
          usersList: []
        };
        const newUserArr = currResp.usersList.map((item) => {
          const mappedUser = {
            _id: item._id,
            first_name: item.first_name,
            last_name: item.last_name,
            email: item.email,
            role: item.role === 'job-seeker' ? 'Job Seeker' : item.role,
            createdDtm: item.createdDtm,
            updatedDtm: item.updatedDtm,
          };
          return mappedUser;
        });
        userListResp.usersList = newUserArr;
        return userListResp;
      }))
    .subscribe(response => {
      this.getUsers = response.usersList;
      this.dataSource = response.usersList;
      this.totalUsers = response.totalCount;
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.getUsersSubscription = this.adminUserService.getUsers(this.postsPerPage, this.currentPage, '')
      .pipe(map(currResp => {
        const userListResp = {
          totalCount: currResp.totalCount,
          usersList: []
        };
        const newUserArr = currResp.usersList.map((item) => {
          const mappedUser = {
            _id: item._id,
            first_name: item.first_name,
            last_name: item.last_name,
            email: item.email,
            role: item.role === 'job-seeker' ? 'Job Seeker' : item.role,
            createdDtm: item.createdDtm,
            updatedDtm: item.updatedDtm,
          };
          return mappedUser;
        });
        userListResp.usersList = newUserArr;
        return userListResp;
      }))
    .subscribe(response => {
      this.getUsers = response.usersList;
      this.dataSource = response.usersList;
      this.totalUsers = response.totalCount;
    });
  }

  ngOnDestroy() {
    this.getUsersSubscription.unsubscribe();
  }

}
