import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = environment.backendUrl
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/auth/login`, body);
  }

  signup(
    name: string,
    email: string,
    phone: string,
    password: string
  ): Observable<any> {
    const body = { name, email, phone, password };
    return this.http.post(`${this.apiUrl}/auth/signup`, body);
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
