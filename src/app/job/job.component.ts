import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../job.service';
import { Job } from '../models/job.model';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent implements OnInit {

  errorMessage: string = '';
  jobForm!: FormGroup;
  studentId: any;
  

  constructor(private fb: FormBuilder, private jobService: JobService, private router:Router) { }

  onSubmit() {
    console.log(this.studentId)
    if (this.jobForm.valid) {
      const jobData = this.jobForm.value;
      const newJob: Job = {
        jobId: 0, 
        profile: jobData.profile,
        desc: jobData.desc,
        exp: jobData.exp,
        techs: jobData.techs,
        studentId: this.studentId, 
        contact: jobData.contact,
        datePosted: '' 
      };

      this.jobService.createJob(newJob).subscribe(
        response => {
          console.log('Job created successfully:', response);
          this.router.navigate([`${`home`}`]);
          this.jobForm.reset();
        },
        error => {
          console.error('Error creating job:', error);
        }
      );
    }
    else {
      this.errorMessage = 'Please fill all the required Information';
      this.jobForm.dirty;
    }
  }

  ngOnInit() {
    this.studentId = sessionStorage.getItem('studentId');
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    if(loggedIn != 'YES'){
      console.log(loggedIn)
      this.router.navigate([``]);
    }
    this.jobForm = this.fb.group({
      profile: ['', Validators.required ],
      desc: ['', Validators.required ],
      exp: ['', Validators.required ],
      techs: ['', Validators.required ],
      contact: ['', [Validators.required, Validators.email ]]
    });
  }
}