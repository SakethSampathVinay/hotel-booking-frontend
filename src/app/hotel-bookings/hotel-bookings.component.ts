import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingsService } from '../services/bookings.service';

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

  ngOnInit(): void {
    this.bookingService.getBooking().subscribe({
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
    console.log('🧾 Full booking object:', booking); // ✅ Add this
    console.log('🧾 Sending booking_id:', booking._id); // ← Add this to debug
    this.bookingService.updateBookingPaid(booking._id).subscribe({
      next: (res) => {
        booking.status = 'Paid';
        console.log('✅ Payment updated:', res);
      },
      error: (err) => {
        console.error('❌ Payment update failed:', err);
      },
    });
  }
}
