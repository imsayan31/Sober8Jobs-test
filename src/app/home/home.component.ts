import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeBanner = '../../assets/images/home-banner.jpeg';
  homeTopCompanies = [
    '../../assets/images/accenture.jpg',
    '../../assets/images/capgemini.jpg',
    '../../assets/images/cts.png',
    '../../assets/images/ibm.jpg',
    '../../assets/images/microsoft.jpg',
    '../../assets/images/tcs.png'
  ];
  constructor() { }

  ngOnInit() {
  }

}
