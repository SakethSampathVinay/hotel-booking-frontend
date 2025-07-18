import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private apiUrl = environment.backendUrl
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  bookRoom(data: any): Observable<any> {
    const url = `${this.apiUrl}/book-room`;
    return this.http.post(url, data, { headers: this.getAuthHeaders() });
  }

  getBooking(): Observable<any> {
    const url = `${this.apiUrl}/get-bookings`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  updateBookingPaid(bookingId: string): Observable<any> {
    const url = `${this.apiUrl}/update-pay`;
    const body = {
      booking_id: bookingId,
      status: 'Paid',
    };
    return this.http.put(url, body, {
      headers: this.getAuthHeaders(),
    });
  }

  cancelBooking(bookingId: string): Observable<any> {
    const url = `${this.apiUrl}/cancel-booking/${bookingId}`;
    return this.http.delete(url, { headers: this.getAuthHeaders() });
  }

  makePayment(
    amount: number,
    name: string,
    roomId: string,
    bookingId: string
  ): void {
    const url = `${this.apiUrl}/api/create-order`;
    const headers = this.getAuthHeaders();

    this.http
      .post<any>(url, { amount, room_id: roomId }, { headers })
      .subscribe((order) => {
        const options = {
          key: 'rzp_test_L0PKrkZl2dGUmB',
          amount: order.amount,
          currency: 'INR',
          name: name,
          order_id: order.id,
          handler: (response: any) => {
            this.confirmBooking(response, amount, roomId, bookingId);
          },
          prefill: {
            name: 'Test User',
            email: 'test@example.com',
          },
          notes: {
            bookingId,
            roomId,
          },
          theme: {
            color: '#3399cc',
          },
        };
        const rzp = new Razorpay(options);
        rzp.open();
      });
  }

  confirmBooking(
    response: any,
    amount: number,
    roomId: string,
    bookingId: string
  ): void {
    const bookingData = {
      amount,
      room_id: roomId,
      booking_id: bookingId,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
    };

    this.http
      .post(`${this.apiUrl}/api/confirm-booking`, bookingData, {
        headers: this.getAuthHeaders(),
      })
      .subscribe({
        next: (res) => {
          alert('🎉 Booking confirmed!');
        },
        error: (err) => {
          alert('❌ Booking failed');
          console.error('❌ Error confirming booking:', err);
        },
      });
  }

  postFeedback(data: any): Observable<any> {
    const url = `${this.apiUrl}/add-feedback`;
    return this.http.post(url, data, { headers: this.getAuthHeaders() });
  }

  getFeedback(hotelId: string): Observable<any> {
    const url = `${this.apiUrl}/get-feedback/${hotelId}`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  calculateBooking(bookingData: string): Observable<any> {
    const url = `${this.apiUrl}/calculate-booking`;
    return this.http.post(url, bookingData, { headers: this.getAuthHeaders() });
  }
}
