import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Title } from "@angular/platform-browser";
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material';

import { AdminUserService } from './admin-users.service';

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
  getUsers: [];
  displayedColumns: string[] = ['name', 'email', 'role', 'createdDtm', 'updatedDtm'];
  dataSource = new MatTableDataSource();
  totalUsers = 10;
  postsPerPage = 5;
  pageSizeOptions = [1, 2, 5, 10];
  currentPage = 1;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private http: HttpClient, private titleService: Title, private adminUserService: AdminUserService) { 
  	this.titleService.setTitle("Find Your Jobs :: Users List");
  	
	//this.dataSource = new MatTableDataSource(this.getUsers);
  }

  ngOnInit() {
  	this.getUsersSubscription = this.adminUserService.getUsers(this.postsPerPage, this.currentPage).subscribe(response => {
  		this.getUsers = response.usersList;
		  this.dataSource = response.usersList;
  	});
  	this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
  	/*this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;*/
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChangedPage(pageData: PageEvent) {
    console.log(pageData);
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.getUsersSubscription = this.adminUserService.getUsers(this.postsPerPage, this.currentPage).subscribe(response => {
      this.getUsers = response.usersList;
      this.dataSource = response.usersList;
    });
  }

  ngOnDestroy() {
  	this.getUsersSubscription.unsubscribe();
  }

}
