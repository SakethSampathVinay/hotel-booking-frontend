import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onLogin(): void {
    this.authService
      .login({email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);
          console.log('Login Successful: ', response);
          alert('Login Successfully');
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials.');
        },
      });
  }
}
