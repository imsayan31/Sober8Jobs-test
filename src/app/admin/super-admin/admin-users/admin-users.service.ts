import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})

export class AdminUserService {
	users = [];
	constructor(private http: HttpClient) {
		
	}

	/* Fetch Users */
	getUsers(pageSize: number = null, page: number = null, searchString: string = null) {
	 return this.http
		.get<{status: number, message: string, usersList: any, totalCount: number}>('http://localhost:3000/api/admin/get-users?pageSize=' + pageSize + '&page=' + page + '&search=' + searchString)
	}

	/* Get User Details */
	getUserDetails(userId: string) {
		return this.http
		.get<{status: number, message: string, userInfo: any }>('http://localhost:3000/api/admin/get-user-details?userId=' + userId);
	}

	/* Update User Details */
	updateUserProfileDetails(userData: any) {
		return this.http
		.put<{status: number, message: string}>('http://localhost:3000/api/admin/update-user-profile', userData);
	}

}