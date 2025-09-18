import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../services/room.service';
import { BookingsService } from '../services/bookings.service';
import { roomCommonData } from '../../assets/assets';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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

  check_in: string = '';
  check_out: string = '';
  guest_count: number = 1;

  rating: number = 5;
  comment: string = '';

  bookingData: any = {};
  feedbackData: any[] = [];
  bookingSummary: any = null;

  minDate: string = '';
  minDateCheckOut: string = '';

  errorMsg: string = '';

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private bookings: BookingsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const id = this.route.snapshot.paramMap.get('id');

    const today = new Date();
    const checkOutMinDate = new Date(today);
    checkOutMinDate.setDate(today.getDate() + 2);
    this.minDate = today.toISOString().split('T')[0];
    this.minDateCheckOut = checkOutMinDate.toISOString().split('T')[0];

    this.subscriptions.add(
      this.roomService.getRooms().subscribe(
        (response) => {
          this.data = response.hotels;
          this.hotel = this.data.find((room) => room.id.toString() === id);

          if (this.hotel && Array.isArray(this.hotel.images)) {
            if (this.hotel.images.length > 0) {
              this.selectedImage = this.hotel.images[0];
            } else {
              console.warn('No images available for this hotel.');
            }
          } else {
            this.hotel.images = [];
            console.warn('Hotel images not found or not an array.');
          }
          this.updateBookingCalculation();
          this.toastr.success('Hotel Details Fetched Successfully', 'Success');
        },
        (error) => {
          console.error('Error fetching rooms:', error);
          this.data = [];
          this.errorMsg = `Error: ${error.status} ${error.error.message}`;
          this.toastr.error(this.errorMsg);
        }
      )
    );

    this.getFeedback(id!);
  }

  bookNow(): void {
    if (!this.check_in || !this.check_out || this.guest_count < 1) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const bookingDetails = {
      room_id: this.hotel.id,
      guest_count: this.guest_count || 0,
      check_in: this.check_in,
      check_out: this.check_out,
      image: this.selectedImage || this.hotel.images?.[0] || '',
      name: this.hotel.hotel_name || '',
      address: this.hotel.street_address || '',
      pricePerNight: this.hotel.price_per_night || 0,
      totalAmount: this.bookingSummary.total_amount,
    };

    this.subscriptions.add(
      this.bookings.bookRoom(bookingDetails).subscribe({
        next: (response) => {
          this.bookingData = response;
          this.router.navigate(['/bookings']);
          this.toastr.success('Hotel Booked Successfully', 'Success');
        },
        error: (error) => {
          console.error('Error booking room:', error);
          alert('Error booking room. Please try again later.');
          this.errorMsg = `Error: ${error.status} ${error.error.message}`;
          this.toastr.error(this.errorMsg);
        },
      })
    );
  }

  submitFeedback(): void {
    const id = this.route.snapshot.paramMap.get('id');

    const payload = {
      room_id: id,
      rating: this.rating,
      comment: this.comment,
    };

    this.subscriptions.add(
      this.bookings.postFeedback(payload).subscribe({
        next: (response) => {
          this.comment = '';
          this.getFeedback(id!);
          this.toastr.success('Review Submitted Successfully', 'Success');
        },
        error: (error) => {
          console.log(error);
          this.errorMsg = `Error: ${error.status} ${error.error.message}`;
          this.toastr.error(this.errorMsg);
        },
      })
    );
  }

  getFeedback(room_id: string): void {
    this.subscriptions.add(
      this.bookings.getFeedback(room_id).subscribe((data) => {
        this.feedbackData = data.feedbacks;
      })
    );
  }

  updateBookingCalculation(): void {
    if (
      !this.hotel?.id ||
      !this.hotel?.room_type ||
      !this.check_in ||
      !this.check_out ||
      this.guest_count < 1
    ) {
      this.bookingSummary = null;
      return;
    }

    this.bookingData = {
      room_id: this.hotel.id,
      roomType: this.hotel.room_type,
      guest_count: this.guest_count,
      check_in: this.check_in,
      check_out: this.check_out,
    };

    this.subscriptions.add(
      this.bookings.calculateBooking(this.bookingData).subscribe({
        next: (response) => {
          this.bookingSummary = response.data;
        },
        error: (error) => {
          console.error('Error calculating error: ', error);
          this.bookingSummary = null;
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    console.log(
      'HotelDetailsComponent destroyed and subscriptions cleaned up.'
    );
  }
}
