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

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rooms', component: HotelsComponent },
  { path: 'rooms/:id', component: HotelDetailsComponent },
  { path: 'bookings', component: HotelBookingsComponent },
  { path: 'experience', component: ExperiencesComponent },
  { path: 'about', component: AboutComponent },
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent, canActivate: [authGuard]},
  { path: '**', component: PageNotFoundComponent },
];
