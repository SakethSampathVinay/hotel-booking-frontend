import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'https://hotel-booking-backend-74ai.onrender.com/auth';
  // https://hotel-booking-backend-74ai.onrender.com/auth
  // http://127.0.0.1:5000/auth
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  signup(
    name: string,
    email: string,
    phone: string,
    password: string
  ): Observable<any> {
    const body = { name, email, phone, password };
    return this.http.post(`${this.apiUrl}/signup`, body);
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
