import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private signupSerive: LoginService, private router: Router) {}

  onSignup(): void {
    this.signupSerive.signup(this.name, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Signup Successfully', response);
        this.message = 'Signup successful! Please log in.';
        localStorage.setItem('token', response.token);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Signup failed', error);
      },
    });
  }

  onLoginRedirect(): void {
    this.router.navigate(['/login']);
  }
}
