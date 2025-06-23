import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../services/room.service';
import { BookingsService } from '../services/bookings.service';

@Component({
  selector: 'app-hotel-details',
  imports: [NgIf, FormsModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.css',
})
export class HotelDetailsComponent implements OnInit {
  data: any[] = [];
  hotel: any;
  selectedImage: string = '';

  // room_id: string = '';
  check_in: string = '';
  check_out: string = '';
  guest_count: number = 1;
  createdAt: string = new Date().toISOString();

  bookingData: any[] = [];

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private bookings: BookingsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.roomService.getRooms().subscribe({
      next: (response) => {
        this.data = response;
        this.hotel = this.data.find((room) => room._id === id);

        if (this.hotel && this.hotel.images && this.hotel.images.length > 0) {
          this.selectedImage = this.hotel.images[0];
        }
      },
      error: (error) => {
        console.error('Error fetching rooms:', error);
        this.data = [];
      },
    });
  }

  bookNow(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (this.check_in && this.check_out && this.guest_count >= 1) {
      const bookingDetails = {
        room_id: id,
        guest_count: this.guest_count,
        check_in: this.check_in,
        check_out: this.check_out,
        image: this.selectedImage || (this.hotel.images?.[0] ?? ''),
        name: this.hotel.hotelName || '',
        address: this.hotel.streetAddress || '',
      };
      this.bookings.bookRoom(bookingDetails).subscribe({
        next: (response) => {
          console.log('Booking Successful: ', response);
          this.bookingData.push(response);
        },
        error: (error) => {
          console.error('Error booking room: ', error);
          alert('Error booking room. Please try again later.');
        },
      });
    }
  }
}
