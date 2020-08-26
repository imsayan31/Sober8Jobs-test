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
	getUsers(pageSize: number = null, page: number = null) {
	 return this.http
		.get<{status: number, message: string, usersList: any}>('http://localhost:3000/api/admin/get-users?pageSize=' + pageSize + '&page=' + page)
	}

}