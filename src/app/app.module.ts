import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatButtonModule,
  MatDialogModule,
} from '@angular/material';

import { AuthModule } from './frontend/auth/auth.module';
import { FooterComponent } from './footer/footer.component';
import { EmployerModule } from './frontend/employer/employer.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    AuthModule,
    EmployerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
