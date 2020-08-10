import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatButtonModule,
  MatDialogModule,
} from '@angular/material';

import { AuthModule } from './frontend/auth/auth.module';
import { HeaderComponent } from './header/header.component';
import { AdminHeaderComponent } from './admin/super-admin/admin-header/admin-header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminFooterComponent } from './admin/super-admin/admin-footer/admin-footer.component';
import { EmployerModule } from './frontend/employer/employer.module';
import { SuperAdminModule } from './admin/super-admin/super-admin.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminHeaderComponent,
    FooterComponent,
    AdminFooterComponent,
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
    EmployerModule,
    SuperAdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
