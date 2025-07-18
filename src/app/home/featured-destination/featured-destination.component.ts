import { Component } from '@angular/core';
import { assets } from '../../../assets/assets';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-featured-destination',
  imports: [NgFor, FormsModule, CommonModule, RouterModule, RouterLink],
  templateUrl: './featured-destination.component.html',
  styleUrls: ['./featured-destination.component.css'],
})
export class FeaturedDestinationComponent {
  constructor(private roomService: RoomService) {}

  rooms: any[] = [];

  ngOnInit() {
    this.roomService.getRooms().subscribe({
      next: (response) => {
        this.rooms = response.map((room: any) => {
          return room;
        });
      },
      error: (error) => {
        console.error('Error fetching rooms:', error);
        this.rooms = [];
      },
    });
  }
}
