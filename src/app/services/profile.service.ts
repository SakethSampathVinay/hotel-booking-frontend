import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = environment.backendUrl;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/get-profile/${user_id}`, { headers });
  }

  updateProfile(profileData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      `${this.apiUrl}/update-profile/${user_id}`,
      profileData,
      {
        headers,
      }
    );
  }

  deleteProfile(): Observable<any> {
    const user_id = localStorage.getItem('user');
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return this.http.delete(`${this.apiUrl}/delete-profile/${user_id}`, {
      headers,
    });
  }
}
