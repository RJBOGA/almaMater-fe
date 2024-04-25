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

  // hide: boolean = false;

  // constructor(private fb: FormBuilder, private router:Router, private app:AppModule) {
  // }

  // ngOnInit() {
  // }

  // loginForm: FormGroup = this.fb.group({
  //   email: ['', [Validators.required, Validators.email]],
  //   password: ['', [Validators.required, Validators.minLength(6)]]
  // })


  // onLogin() {
  //   if (!this.loginForm.valid) {
  //     return;
  //   }
  //   console.log(this.loginForm.value);
  //   this.goToPage(`home`);
  // }

goToPage(pageName: String){
this.app.goToPage(pageName);
}
  hide: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService, private app:AppModule
  ) { }

  ngOnInit() { }

  loginForm: FormGroup = this.fb.group({
    studentId: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(1)]]
  })

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }

    const { studentId, password } = this.loginForm.value;

    this.userService.getUserByUsernameAndPassword(studentId, password).subscribe(
      (user: User) => {
        console.log(Response);
        document.cookie = `studentId=${user.studentId}; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
        sessionStorage.setItem('studentDetails', JSON.stringify(user));
        this.router.navigate(['home']);
      },
      error => {
        // Handle authentication error
        if (error.status === 404) {
          this.errorMessage = 'User does not exist.';
        } else {
          this.errorMessage = 'Authentication failed. Please try again.';
        }
      }
    );
  }

}