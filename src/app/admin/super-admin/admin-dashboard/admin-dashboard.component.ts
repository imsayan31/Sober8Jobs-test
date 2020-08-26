import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private titleService:Title) { 
  	this.titleService.setTitle("Find Your Jobs :: Admin Dashboard");
   }

  ngOnInit() {
  }

}
