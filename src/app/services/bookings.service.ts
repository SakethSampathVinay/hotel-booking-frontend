import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private apiUrl = 'https://hotel-booking-backend-74ai.onrender.com/';

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

  updateBookingPaid(bookingId: string): Observable<any> {
    const url = `${this.apiUrl}update-pay`;
    const body = {
      booking_id: bookingId,
      status: 'Paid',
    };
    console.log('📦 Sending body:', body);
    return this.http.put(url, body, {
      headers: this.getAuthHeaders(),
    });
  }
}
