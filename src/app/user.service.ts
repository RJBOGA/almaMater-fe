import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8081/alma-mater';

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/addUser`, user);
  }

  getUserByUsernameAndPassword(studentId: number, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/getWith/${studentId}/${password}`);
  }

  getAllAlumni(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/getAllUsers`);
  }

  getUserByStudentId(studentId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/getUser/${studentId}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/updateUser`, user);
  }

  deleteUserById(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${userId}`);
  }
}
