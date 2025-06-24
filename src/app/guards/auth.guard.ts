import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  const router = inject(Router); // ✅ Properly inject Angular's Router

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/signup']);
    return false;
  }
};
