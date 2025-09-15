import { Component } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profileData: any = {};
  isEditMode: boolean = false;

  constructor(private profileService: ProfileService, private router: Router) {}
  private profileServiceSubscription!: Subscription;

  ngOnInit() {
    this.getProfileDetails();
  }

  getProfileDetails() {
    this.profileServiceSubscription = this.profileService
      .getProfile()
      .subscribe((data) => {
        this.profileData = data.profile;
      });
  }

  enableEditMode() {
    this.isEditMode = true;
  }

  updateProfileDetails() {
    this.profileServiceSubscription = this.profileService
      .updateProfile(this.profileData)
      .subscribe(() => {
        this.isEditMode = false;
      });
  }

  deleteProfile() {
    this.profileServiceSubscription = this.profileService
      .deleteProfile()
      .subscribe(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/signup']);
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/signup']);
  }

  ngOnDestroy() {
    if (this.profileServiceSubscription) {
      this.profileServiceSubscription.unsubscribe();
    }
  }
}
