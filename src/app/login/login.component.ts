//login.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AppModule } from '../app.module';
import { User } from '../models/user.model';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

goToPage(pageName: String){
this.app.goToPage(pageName);
}
  hide: boolean = false;
  errorMessage: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService, private app:AppModule
  ) { }

  ngOnInit() { 
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    if(loggedIn == 'YES'){
      this.router.navigate(['home']);
    }
  }

  loginForm: FormGroup = this.fb.group({
    studentId: ['', [Validators.required, Validators.minLength(1)]],
    password: ['', [Validators.required, Validators.minLength(1)]]
  })

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    const studentIdinCookie = this.getStudentIdFromCookie();
    if (studentIdinCookie) {
      this.isLoggedIn = true;
      sessionStorage.setItem('isLoggedIn', "YES");
      sessionStorage.setItem('studentId', studentIdinCookie);
    }

    const { studentId, password } = this.loginForm.value;

    this.userService.getUserByUsernameAndPassword(studentId, password).subscribe(
      (user: User) => {
        console.log(Response);
        document.cookie = `studentId=${user.studentId}; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
        sessionStorage.setItem('studentDetails', JSON.stringify(user));
        sessionStorage.setItem('isLoggedIn', "YES");
        sessionStorage.setItem('studentId', JSON.stringify(user.studentId));
        sessionStorage.setItem('Name', JSON.stringify(user.firstName + " ," + user.lastName));
        this.router.navigate(['home']);
      },
      error => {
        if (error.status === 404) {
          this.errorMessage = 'User does not exist or wrong password';
        } else {
          this.errorMessage = 'Authentication failed. Please try again.';
        }
      }
    );
  }

  private getStudentIdFromCookie(): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === 'studentId') {
        return value;
      }
    }
    return null;
  }

}