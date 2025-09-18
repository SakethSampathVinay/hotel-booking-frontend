import { Component } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profileData: any = {};
  isEditMode: boolean = false;
  errorMsg: string = '';

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private toastr: ToastrService
  ) {}
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
        this.toastr.success('Profile Updated Successfully', 'Success');
      });
  }

  deleteProfile() {
    this.profileServiceSubscription = this.profileService
      .deleteProfile()
      .subscribe({
        next: () => {
          localStorage.removeItem('token');
          this.router.navigate(['/signup']);
          this.toastr.warning('Account Deleted!!!');
        },
        error: (error) => {
          console.log(error);
          this.errorMsg = `Error: ${error.status} ${error.error.message}`;
          this.toastr.error(this.errorMsg);
        },
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/signup']);
    this.toastr.success('Logged Out!!!', 'Success');
  }

  ngOnDestroy() {
    if (this.profileServiceSubscription) {
      this.profileServiceSubscription.unsubscribe();
    }
  }
}
