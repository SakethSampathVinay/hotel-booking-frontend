import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  showPassword: boolean = false;
  message: string = '';
  errorMsg: string = '';

  constructor(
    private signupSerive: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onShowPassword() {
    if (this.showPassword === false) {
      this.showPassword = true;
    } else {
      this.showPassword = false;
    }
  }

  onSignup(): void {
    this.signupSerive
      .signup(this.name, this.email, this.phone, this.password)
      .subscribe({
        next: (response) => {
          this.message = 'Signup successful! Please log in.';
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', response.user);
          this.router.navigate(['/login']);
          this.toastr.success('Welcome to EasyStay😊', 'Success');
        },
        error: (error) => {
          console.error('Signup failed', error);
          this.errorMsg = `Error: ${error.status} ${error.error.message}`;
          this.toastr.error(this.errorMsg);
        },
      });
  }

  onLoginRedirect(): void {
    this.router.navigate(['/login']);
  }
}
