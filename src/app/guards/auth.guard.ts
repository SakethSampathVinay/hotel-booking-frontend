import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token; // This line converts the token value to a Boolean (either true or false).
  const router = inject(Router); // Inject the router service to navigate if not authenticated.

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/signup']);
    return false;
  }
};
