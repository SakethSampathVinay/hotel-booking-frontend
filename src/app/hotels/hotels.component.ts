import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RoomService } from '../services/room.service';
import { FiltersComponent } from './filters/filters.component';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [NgFor, CommonModule, FiltersComponent, RouterModule],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css',
})
export class HotelsComponent implements OnInit {
  filteredRooms: any[] = [];

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomService.getRooms().subscribe({
      next: (response) => {
        this.filteredRooms = response;
      },
      error: (error) => {
        console.error('Error fetching rooms:', error);
        this.filteredRooms = [];
      },
    });
  }

  trackByRoom(index: number, room: any): any {
    return room._id;
  }

  updateRooms(filteredList: any[]) {
    this.filteredRooms = filteredList;
  }
}
