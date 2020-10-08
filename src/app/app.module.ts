import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatToolbarModule,
  MatIconModule,
} from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';

import { AdminFooterComponent } from './admin/super-admin/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './admin/super-admin/admin-header/admin-header.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './frontend/auth/auth.module';
import { EmployerModule } from './frontend/employer/employer.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { SuperAdminModule } from './admin/super-admin/super-admin.module';
import { CompanyDetailsComponent } from './admin/super-admin/company-details/company-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminHeaderComponent,
    FooterComponent,
    AdminFooterComponent,
    LoaderComponent,
    MessageDialogComponent,
    CompanyDetailsComponent
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
    SuperAdminModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MessageDialogComponent, CompanyDetailsComponent]
})
export class AppModule { }
