import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingsService } from '../services/bookings.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hotel-bookings',
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './hotel-bookings.component.html',
  styleUrl: './hotel-bookings.component.css',
})
export class HotelBookingsComponent {
  isPaid: boolean = false;

  bookingsData: any[] = [];
  errorMsg: string = '';

  constructor(
    private bookingService: BookingsService,
    private toastr: ToastrService
  ) {}
  private bookingSubscription!: Subscription;

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.bookingSubscription = this.bookingService.getBooking().subscribe({
      next: (response) => {
        this.bookingsData = response.bookings;
        this.toastr.success('Fetched Bookings', 'Success');
      },
      error: (error) => {
        console.error('Error fetching bookigns: ', error);
        this.errorMsg = `Error: ${error.status} ${error.error.message}`;
        this.toastr.error(this.errorMsg);
        return (this.bookingsData = []);
      },
    });
  }

  isPaidfn(booking: any) {
    this.bookingSubscription = this.bookingService
      .updateBookingPaid(booking.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          booking.status = 'Paid';
          this.toastr.success('Payment done Successfully', 'Success');
          setTimeout(() => {
            this.reloadBookings();
          }, 500);
        },
        error: (err) => {
          console.error('Payment update failed:', err);
          this.errorMsg = `Error: ${err.status} ${err.error.message}`;
          this.toastr.error(this.errorMsg);
        },
      });
  }

  makePayment(booking: any) {
    const amount = booking.total_amount || booking.totalAmount;
    const roomId = booking.room_id || booking.roomId;
    const bookingId = booking._id || booking.id;
    const name = booking.name;
    const userId = booking.userId || localStorage.getItem('user');

    this.bookingService.makePayment(amount, name, roomId, bookingId, userId);
  }

  cancelBooking(id: string): void {
    this.bookingSubscription = this.bookingService
      .cancelBooking(id)
      .subscribe((data: any) => {
        console.log('Successfully Cancelled the Booking');
        this.toastr.success('Successfully Cancelled the Booking', 'Success');
        this.reloadBookings();
      });
  }

  reloadBookings() {
    this.bookingService.getBooking().subscribe({
      next: (response) => {
        this.bookingsData = response.bookings;
      },
      error: (error) => {
        this.errorMsg = `Error: ${error.status} ${error.error.message}`;
        this.toastr.error(this.errorMsg);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.bookingSubscription) {
      this.bookingSubscription.unsubscribe();
    }
  }
}
