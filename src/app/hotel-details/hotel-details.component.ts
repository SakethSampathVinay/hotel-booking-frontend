import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../services/room.service';
import { BookingsService } from '../services/bookings.service';
import { roomsDummyData, roomCommonData } from '../../assets/assets';

@Component({
  selector: 'app-hotel-details',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.css',
})
export class HotelDetailsComponent implements OnInit {
  roomCommonData = roomCommonData;

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
          this.router.navigate(['/bookings']);
        },
        error: (error) => {
          console.error('Error booking room: ', error);
          alert('Error booking room. Please try again later.');
        },
      });
    }
  }
}
