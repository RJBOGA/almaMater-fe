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
  user: any; // Type should be updated based on the user model
  jobsList: Job[] =[];
  userFb!: User;
  editForm!: FormGroup;
  isEditMode: boolean = false;
  disabled: boolean = false;
  studentId: any;

  constructor(private http: HttpClient, private userService: UserService, private fb: FormBuilder, private jobServ: JobService, private cookieService: CookieService) { }

  ngOnInit(): void {
    // Fetch user details from session storage or API call
    this.studentId = this.cookieService.get('studentId');
    this.user = JSON.parse(sessionStorage.getItem('studentDetails')||"");
    this.user = JSON.parse(sessionStorage.getItem('studentDetails')||"");
    this.fetchJobs();
    // Initialize edit form with user details
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
    this.http.get<Job[]>('http://localhost:8081/alma-mater/getAllJobs')
      .subscribe(jobs => this.jobsList = jobs);
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  submitEdit(): void {
    if (this.editForm.valid) {
      console.log("submitEdit")
      const userdetails: User = JSON.parse(sessionStorage.getItem('studentDetails')||"")
      const editedUser: User = this.editForm.value;
      editedUser.studentId = userdetails.studentId;
      editedUser.dateTime = userdetails.dateTime;

      console.log("User",editedUser)
      this.userService.updateUser(editedUser).subscribe(
        response => {
          console.log('User details updated successfully:', response);
          // Update user details in session storage
          sessionStorage.setItem('studentDetails', JSON.stringify(editedUser));
          // Switch back to view mode
          this.isEditMode = false;
        },
        error => {
          console.error('Error updating user details:', error);
          // Handle error
        }
      );
    }
  }

  deleteJob(jobId: number): void {
    if (confirm("Are you sure you want to delete this job?")) {
      this.jobServ.deleteJob(this.studentId, jobId).subscribe(
        response => {
          console.log('Job deleted successfully:', response);
          // Refresh the jobs list after deletion
          this.fetchJobs();
        },
        error => {
          console.error('Error deleting job:', error);
          // Handle error
        }
      );
    }
  }
  
}