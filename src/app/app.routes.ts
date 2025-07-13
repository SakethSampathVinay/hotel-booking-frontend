import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HotelBookingsComponent } from './hotel-bookings/hotel-bookings.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { AboutComponent } from './about/about.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { loginSignupGuard } from './guards/login-signup.guard';
import { RenderMode } from '@angular/ssr';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
    canActivate: [loginSignupGuard],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.component').then((c) => c.SignupComponent),
    canActivate: [loginSignupGuard],
  },

  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
    canActivate: [authGuard],
  },
  {
    path: 'rooms',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./hotels/hotels.component').then((c) => c.HotelsComponent),
  },
  {
    path: 'rooms/:id',
    loadComponent: () =>
      import('./hotel-details/hotel-details.component').then(
        (c) => c.HotelDetailsComponent
      ),
    canActivate: [authGuard],
    data: {
      renderMode: 'default',
    },
  },
  {
    path: 'bookings',
    loadComponent: () =>
      import('./hotel-bookings/hotel-bookings.component').then(
        (c) => c.HotelBookingsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./experiences/experiences.component').then(
        (c) => c.ExperiencesComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then((c) => c.AboutComponent),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then((c) => c.ProfileComponent),
    canActivate: [authGuard],
  },

  { path: '**', component: PageNotFoundComponent },
];
