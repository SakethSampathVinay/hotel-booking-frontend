import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin(): void {
    this.loginService.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login failed', error);
      },
    });
  }

  onSignupRedirect(): void {
    this.router.navigate(['/signup']);
  }
}
