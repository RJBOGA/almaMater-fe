import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from './models/job.model';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private baseUrl = 'http://localhost:8081/alma-mater';

  constructor(private http: HttpClient) { }

  createJob(job: Job): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/createJob`, job);
  }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/getAllJobs`);
  }

  deleteJob(studentId: number, jobId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteJob/${studentId}/${jobId}`);
  }

  getJobsOfUser(userId: number): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/userJobs/${userId}`);
  }
}
