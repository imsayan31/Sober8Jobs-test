import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-employer-jobs',
  templateUrl: './employer-jobs.component.html',
  styleUrls: ['./employer-jobs.component.css']
})
export class EmployerJobsComponent implements OnInit {
	jobsForm: FormGroup;

  constructor() { }

  ngOnInit() {


  	/* Jobs Form */
  	this.jobsForm = new FormGroup({
  		
  	});
  }

}
