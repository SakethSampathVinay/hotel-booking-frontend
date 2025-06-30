import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'https://hotel-booking-backend-74ai.onrender.com';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/get-profile`, { headers });
  }

  updateProfile(profileData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.apiUrl}/update-profile`, profileData, {
      headers,
    });
  }

  deleteProfile(): Observable<any> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Or use cookies if configured
    };

    return this.http.delete(`${this.apiUrl}/delete-profile`, {
      headers,
    });
  }
}
