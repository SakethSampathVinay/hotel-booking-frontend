import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { userBookingsDummyData } from '../../assets/assets';
import { roomsDummyData } from '../../assets/assets';
import { BookingsService } from '../services/bookings.service';

@Component({
  selector: 'app-hotel-bookings',
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './hotel-bookings.component.html',
  styleUrl: './hotel-bookings.component.css',
})
export class HotelBookingsComponent {
  userBookingsDummyData = userBookingsDummyData;
  roomsDummyData = roomsDummyData;

  bookingsData: any[] = [];

  constructor(private bookingService: BookingsService) {}

  ngOnInit(): void {
    this.bookingService.getBooking().subscribe({
      next: (response) => {
        return this.bookingsData = response.bookings;
      },
      error: (error) => {
        console.error('Error fetching bookigns: ', error);
        return this.bookingsData = [];
      },
    });
  }
}
