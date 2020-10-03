import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Loader } from './loader.service';



@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  /* isLoading: Subject<boolean> = this.loaderService.isLoading; */
  isLoading:boolean = false;

  constructor(public loaderService: Loader) {

    this.loaderService.isLoading.subscribe(loaderVal => {
      this.isLoading = loaderVal;
    });
   }

  ngOnInit() {
  }

}
