import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = 'https://hotel-booking-backend-74ai.onrender.com';
  //  https://hotel-booking-backend-74ai.onrender.com
  // http://127.0.0.1:5000

  constructor(private http: HttpClient) {}

  getRooms(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-rooms`);
  }
}
