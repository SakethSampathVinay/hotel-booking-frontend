import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSignup(): void {
    this.authService
      .signup({ name: this.name, email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          alert('Signup Successful');
        },
        error: (error) => {
          alert('Signup failed. Please try again.');
          console.error('Signup failed:', error);
        },
      });
  }
}
