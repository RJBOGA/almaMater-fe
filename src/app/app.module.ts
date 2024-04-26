import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { Router } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { JobComponent } from './job/job.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserHomeComponent,
    UserProfileComponent,
    JobComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private router: Router) { }

  goToPage(pageName: String): void {
    this.router.navigate([`${pageName}`]);
  }

  logout():void{
    // sessionStorage.clear;
    // document.cookie = `studentId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    // this.router.navigate([`${``}`]);
    sessionStorage.removeItem('studentId');
    sessionStorage.removeItem('studentDetails');
    sessionStorage.removeItem('isLoggedIn');
    document.cookie = `studentId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    this.router.navigate([`${``}`]);
  }
}
