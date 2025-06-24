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

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loginSignupGuard] },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [loginSignupGuard],
  },

  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'rooms', component: HotelsComponent, canActivate: [authGuard] },
  {
    path: 'rooms/:id',
    component: HotelDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'bookings',
    component: HotelBookingsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'experience',
    component: ExperiencesComponent,
    canActivate: [authGuard],
  },
  { path: 'about', component: AboutComponent, canActivate: [authGuard] },

  { path: '**', component: PageNotFoundComponent },
];
