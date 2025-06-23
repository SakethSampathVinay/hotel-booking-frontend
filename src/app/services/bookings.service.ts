import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private apiUrl = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) {}

  bookRoom(data: any): Observable<any> {
    const url = `${this.apiUrl}book-room`;
    return this.http.post(url, data);
  }

  getBooking(): Observable<any> {
    return this.http.get(`${this.apiUrl}get-bookings`)
  }
}
