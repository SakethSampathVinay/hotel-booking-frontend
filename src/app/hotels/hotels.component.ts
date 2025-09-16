import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RoomService } from '../services/room.service';
import { FiltersComponent } from './filters/filters.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hotels',
  imports: [NgFor, CommonModule, FiltersComponent, RouterModule],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css',
})
export class HotelsComponent implements OnInit {
  allHotels: any[] = [];
  filteredRooms: any[] = [];

  constructor(private roomService: RoomService) {}
  private RoomServiceSubscription!: Subscription;

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.RoomServiceSubscription = this.roomService.getRooms().subscribe({
      next: (response) => {
        this.allHotels = response.hotels;
        this.filteredRooms = [...this.allHotels];
      },
      error: (error) => {
        console.error('Error fetching rooms:', error);
        this.filteredRooms = [];
      },
    });
  }

  onSearch(searchTerm: string) {
    const lowerCaseSearchTerm = searchTerm ? searchTerm.toLowerCase() : '';
    if (!lowerCaseSearchTerm) {
      this.filteredRooms = [...this.allHotels];
      return;
    }
    this.filteredRooms = this.allHotels.filter(
      (hotel) =>
        (hotel.hotel_name?.toLowerCase() || '').includes(lowerCaseSearchTerm) ||
        (hotel.roomType?.toLowerCase() || '').includes(lowerCaseSearchTerm)
    );
  }

  trackByRoom(index: number, room: any): any {
    return room._id;
  }

  updateRooms(filteredList: any[]) {
    this.filteredRooms = filteredList;
  }

  ngOnDestroy(): void {
    if (this.RoomServiceSubscription) {
      this.RoomServiceSubscription.unsubscribe();
    }
  }
}
