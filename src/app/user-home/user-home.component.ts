import { Component } from '@angular/core';
import { AppModule } from '../app.module';
import { User } from '../models/user.model';
import { Job } from '../models/job.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent  {

  UserName: any ;
  alumniList: User[] = [];
  jobsList: Job[] = [];
  constructor(private app:AppModule, private http: HttpClient, private router:Router){}

  ngOnInit() {
    this.fetchAlumni();
    this.fetchJobs();
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    this.UserName = sessionStorage.getItem('Name') || null;
    if(loggedIn != 'YES'){
      console.log(loggedIn)
      this.router.navigate([``]);
      
    }
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
  logout(){
    this.app.logout();
  }

}
