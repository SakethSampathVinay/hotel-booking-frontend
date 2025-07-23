import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginSignupGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');
  const router = inject(Router); // Inject the router service to navigate if a token exists

  if (token) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
