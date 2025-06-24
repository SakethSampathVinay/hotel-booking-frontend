import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private apiUrl = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  bookRoom(data: any): Observable<any> {
    const url = `${this.apiUrl}book-room`;
    return this.http.post(url, data, { headers: this.getAuthHeaders() });
  }

  getBooking(): Observable<any> {
    const url = `${this.apiUrl}get-bookings`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }
}
