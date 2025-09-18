import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  message: string = '';
  errorMsg: string = '';

  constructor(
    private loginService: LoginService,
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

  onLogin(): void {
    this.loginService.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.user.id);
        this.router.navigate(['/']);
        this.toastr.success('Welcome to EasyStay😊', 'Success');
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMsg = `Error: ${error.status} ${error.error.message}`;
        this.toastr.error(this.errorMsg);
      },
    });
  }

  onSignupRedirect(): void {
    this.router.navigate(['/signup']);
  }
}
