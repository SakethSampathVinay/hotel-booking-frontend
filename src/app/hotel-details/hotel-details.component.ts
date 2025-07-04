import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../services/room.service';
import { BookingsService } from '../services/bookings.service';
import { roomCommonData } from '../../assets/assets';
@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.css',
})
export class HotelDetailsComponent implements OnInit {
  roomCommonData = roomCommonData;
  backendBaseUrl = 'https://hotel-booking-backend-74ai.onrender.com';

  data: any[] = [];
  hotel: any;
  selectedImage: string = '';

  check_in: string = '';
  check_out: string = '';
  guest_count: number = 1;

  bookingData: any[] = [];

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private bookings: BookingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const id = this.route.snapshot.paramMap.get('id');

    this.roomService.getRooms().subscribe({
      next: (response) => {
        this.data = response;
        this.hotel = this.data.find((room) => room._id === id);

        console.log('Fetched hotel:', this.hotel);

        if (this.hotel && Array.isArray(this.hotel.images)) {
          this.hotel.images = this.hotel.images.map((img: string) =>
            img.startsWith('http')
              ? img
              : `https://hotel-booking-backend-74ai.onrender.com/${img}`
          );

          if (this.hotel.images.length > 0) {
            this.selectedImage = this.hotel.images[0];
          } else {
            console.warn('No images available for this hotel.');
          }
        } else {
          this.hotel.images = [];
          console.warn('Hotel images not found or not an array.');
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

    if (!this.check_in || !this.check_out || this.guest_count < 1) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const bookingDetails = {
      room_id: id,
      guest_count: this.guest_count || 0,
      check_in: this.check_in,
      check_out: this.check_out,
      image: this.selectedImage || this.hotel.images?.[0] || '',
      name: this.hotel.hotelName || '',
      address: this.hotel.streetAddress || '',
      pricePerNight: this.hotel.pricePerNight || 0,
    };

    this.bookings.bookRoom(bookingDetails).subscribe({
      next: (response) => {
        console.log('Booking Successful:', response);
        this.bookingData.push(response);
        this.router.navigate(['/bookings']);
      },
      error: (error) => {
        console.error('Error booking room:', error);
        alert('Error booking room. Please try again later.');
      },
    });
  }
}
