import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginComponent } from '../frontend/auth/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit() {
  }

  openLogInDialog() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(LoginComponent, {
      height: '400px',
      width: '600px',
    });
  }

}
