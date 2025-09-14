import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = environment.backendUrl;
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getRooms(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-rooms`, {
      headers: this.getAuthHeaders(),
    });
  }
}
