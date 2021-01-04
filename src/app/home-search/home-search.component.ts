import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.css']
})
export class HomeSearchComponent implements OnInit {
  homeSearchForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.homeSearchForm = new FormGroup({
      keywords: new FormControl('', [Validators.required]),
      location: new FormControl(''),
      experience: new FormControl(''),
    });
  }

  onHomeSearchSubmit() {

  }

}
