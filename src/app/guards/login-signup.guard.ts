import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginSignupGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  if (token) {
    // If already logged in, redirect to home/dashboard
    router.navigate(['/']);
    return false;
  }

  // If not logged in, allow access to login/signup
  return true;
};
