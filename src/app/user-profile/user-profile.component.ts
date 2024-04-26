import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppModule } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { Job } from '../models/job.model';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { JobService } from '../job.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user: any; 
  jobsList: Job[] =[];
  userFb!: User;
  editForm!: FormGroup;
  isEditMode: boolean = false;
  disabled: boolean = false;
  studentId: any;

  constructor(private userService: UserService, private fb: FormBuilder, private jobServ: JobService, private cookieService: CookieService, private router:Router, private app:AppModule) { }

  ngOnInit(): void {
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    if(loggedIn != 'YES'){
      console.log(loggedIn)
      this.router.navigate([``]);
    }
    this.studentId = this.cookieService.get('studentId');
    this.user = JSON.parse(sessionStorage.getItem('studentDetails')||"");
    this.fetchJobs();
    
    this.editForm = this.fb.group({
      studentId: [{ value: this.user.studentId, disabled: true }],
      email: [this.user.email],
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      department: [this.user.department],
      graduationYear: [this.user.graduationYear],
      profession: [this.user.profession],
      contactNumber: [this.user.contactNumber],
      address: [this.user.address]
    });
  }

  fetchJobs(): void {
    this.jobServ.getJobsOfUser(this.studentId).subscribe(
      (response: Job[]) => { 
        console.log('Jobs retrieved successfully:', response);
        this.jobsList = response; 
      },
      (error) => {
        console.error('Error retrieving jobs:', error);
      }
    );
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  updateUserObject(): void {
    this.user.email = this.editForm.get('email')?.value;
    this.user.firstName = this.editForm.get('firstName')?.value;
    this.user.lastName = this.editForm.get('lastName')?.value;
    this.user.department = this.editForm.get('department')?.value;
    this.user.graduationYear = this.editForm.get('graduationYear')?.value;
    this.user.profession = this.editForm.get('profession')?.value;
    this.user.contactNumber = this.editForm.get('contactNumber')?.value;
    this.user.address = this.editForm.get('address')?.value;
  }

  submitEdit(): void {
    if (this.editForm.valid) {
      this.updateUserObject(); 
      const userdetails: User = JSON.parse(sessionStorage.getItem('studentDetails')||"")
      const editedUser: User = this.editForm.value;
      editedUser.studentId = userdetails.studentId;
      editedUser.dateTime = userdetails.dateTime;

      this.userService.updateUser(editedUser).subscribe(
        response => {
          console.log('User details updated successfully:', response);
          sessionStorage.setItem('studentDetails', JSON.stringify(editedUser));
          this.isEditMode = false;
        },
        error => {
          console.error('Error updating user details:', error);
        }
      );
    }
  }

  deleteJob(jobId: number): void {
    if (confirm("Are you sure you want to delete this job?")) {
      this.jobServ.deleteJob( jobId).subscribe(
        response => {
          console.log('Job deleted successfully:', response);
          this.fetchJobs();
        },
        error => {
          console.error('Error deleting job:', error);
        }
      );
    }
  }

  logout(){
    this.app.logout();
  }
  goToPage(pageName: String){
    this.app.goToPage(pageName);
  }
}