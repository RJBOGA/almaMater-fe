import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppModule } from '../app.module';
import { UserService } from '../user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private app:AppModule, private userService: UserService) {
    this.registerForm = this.fb.group({
      studentId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      department: ['', Validators.required],
      graduationYear: ['', Validators.required],
      profession: ['', Validators.required],
      contactNumber: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  // onSubmit(): void {
  //   if (this.registerForm.valid) {
  //     // Process form submission here
  //     console.log(this.registerForm.value);
  //   }
  // }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData: User = this.registerForm.value; 
      console.log(userData)
      this.userService.addUser(userData).subscribe(
        response => {
          console.log('User added successfully:', response);
          // Handle success
        },
        error => {
          console.error('Error adding user:', error);
          // Handle error
        }
      );
    }
    this.goToPage(``);
  }

  goToPage(pageName: String){
    this.app.goToPage(pageName);
  }

}
