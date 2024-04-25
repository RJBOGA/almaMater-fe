import { Component } from '@angular/core';
import { AppModule } from '../app.module';
import { User } from '../models/user.model';
import { Job } from '../models/job.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent  {

  alumniList: User[] = [];
  jobsList: Job[] = [];
  constructor(private app:AppModule, private http: HttpClient){}

  ngOnInit() {
    this.fetchAlumni();
    this.fetchJobs();
  }
  
  fetchAlumni() {
    this.http.get<User[]>('http://localhost:8081/alma-mater/getAllUsers')
      .subscribe(alumni => this.alumniList = alumni);
  }

  fetchJobs() {
    this.http.get<Job[]>('http://localhost:8081/alma-mater/getAllJobs')
      .subscribe(jobs => this.jobsList = jobs);
  }
  goToPage(pageName: String){
    this.app.goToPage(pageName);
  }

}
