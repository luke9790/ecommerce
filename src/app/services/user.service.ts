import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/protected';

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  updateUserProfile(updatedData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
  }): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, updatedData);
  }

  getUserAddresses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

}
