import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class AdminSidebarComponent implements OnInit {
  visibility = false;
  constructor() { }

  ngOnInit() {
  }

  toggleSubMenu(e) {
  	console.log(e.target.nextSibling);
  	/*if (event.target !== event.currentTarget) return;*/
  	this.visibility = !this.visibility;
  }

}
