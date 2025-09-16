import { Component } from '@angular/core';
import { assets } from '../../../assets/assets';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { RoomService } from '../../services/room.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-featured-destination',
  imports: [NgFor, FormsModule, CommonModule, RouterModule, RouterLink],
  templateUrl: './featured-destination.component.html',
  styleUrls: ['./featured-destination.component.css'],
})
export class FeaturedDestinationComponent {
  constructor(private roomService: RoomService) {}

  private roomSubscription!: Subscription;

  isLoading: boolean = false;
  rooms: any[] = [];

  ngOnInit() {
    this.isLoading = true;
    this.roomSubscription = this.roomService.getRooms().subscribe({
      next: (response) => {
        this.rooms = response.hotels.map((room: any) => {
          return room;
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching rooms:', error);
        this.rooms = [];
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy() {
    if (this.roomSubscription) {
      this.roomSubscription.unsubscribe();
    }
  }
}
