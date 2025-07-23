import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingsService } from '../services/bookings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hotel-bookings',
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './hotel-bookings.component.html',
  styleUrl: './hotel-bookings.component.css',
})
export class HotelBookingsComponent {
  isPaid: boolean = false;

  bookingsData: any[] = [];

  constructor(private bookingService: BookingsService) {}
  private bookingSubscription! : Subscription;

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.bookingSubscription = this.bookingService.getBooking().subscribe({
      next: (response) => {
        return (this.bookingsData = response.bookings);
      },
      error: (error) => {
        console.error('Error fetching bookigns: ', error);
        return (this.bookingsData = []);
      },
    });
  }

  isPaidfn(booking: any) {
    this.bookingSubscription = this.bookingService.updateBookingPaid(booking._id).subscribe({
      next: (res) => {
        booking.status = 'Paid';
      },
      error: (err) => {
        console.error('Payment update failed:', err);
      },
    });
  }

  makePayment(booking: any) {
    const amount = booking.totalAmount;
    const roomId = booking.room_id || booking.roomId;
    const bookingId = booking._id;
    const name = booking.name;

    this.bookingService.makePayment(amount, name, roomId, bookingId);
  }

  cancelBooking(id: string): void {
    this.bookingSubscription = this.bookingService.cancelBooking(id).subscribe((data: any) => {
      console.log('Successfully Cancelled the Booking');
    });
  }

  ngOnDestroy(): void {
    if(this.bookingSubscription) {
      this.bookingSubscription.unsubscribe();
    }
  }
}
