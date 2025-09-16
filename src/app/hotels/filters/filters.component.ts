import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { roomsDummyData } from '../../../assets/assets';
import { RoomService } from '../../services/room.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  showMobileFilters = false;

  @Output() filteredRoomsChange = new EventEmitter<any[]>();
  @Output() onSearchChange = new EventEmitter<string>();

  popularFilters = ['Single Bed', 'Double Bed', 'Suite'];
  priceRange = [
    '₹1000 to 2000',
    '₹2000 to 5000',
    '₹5000 to 10000',
    '₹10000 to 20000',
  ];
  sortBy = ['Price Low to High', 'Price High to Low', 'Newest First'];

  selectedRoomTypes: string[] = [];
  selectedPriceRanges: string[] = [];
  selectedSortBy: string = '';
  searchTerm: string = '';

  rooms: any[] = [];

  constructor(private roomService: RoomService) {}
  private RoomServiceSubscription!: Subscription;

  ngOnInit() {
    this.RoomServiceSubscription = this.roomService.getRooms().subscribe({
      next: (response) => {
        this.rooms = response.hotels;
        this.emitFilteredRooms();
      },
      error: (error) => {
        console.error('Error fetching rooms:', error);
      },
    });
  }

  toggleFilter(filter: string) {
    this.selectedRoomTypes.includes(filter)
      ? (this.selectedRoomTypes = this.selectedRoomTypes.filter(
          (f) => f !== filter
        ))
      : this.selectedRoomTypes.push(filter);
    this.emitFilteredRooms();
  }

  togglePrice(price: string) {
    this.selectedPriceRanges.includes(price)
      ? (this.selectedPriceRanges = this.selectedPriceRanges.filter(
          (p) => p !== price
        ))
      : this.selectedPriceRanges.push(price);
    this.emitFilteredRooms();
  }

  clearFilters() {
    this.selectedRoomTypes = [];
    this.selectedPriceRanges = [];
    this.selectedSortBy = '';
    this.emitFilteredRooms();
  }

  emitFilteredRooms() {
    const filtered = this.getFilteredRooms();
    this.filteredRoomsChange.emit(filtered);
  }

  SearchChange() {
    this.onSearchChange.emit(this.searchTerm);
  }

  getFilteredRooms() {
    return this.rooms
      .filter((room) => {
        const matchRoomType =
          this.selectedRoomTypes.length === 0 ||
          this.selectedRoomTypes.includes(room.room_type);
        const matchesPrice =
          this.selectedPriceRanges.length === 0 ||
          this.isPriceInSelectedRange(Number(room.price_per_night));
        return matchRoomType && matchesPrice;
      })
      .sort((a, b) => {
        if (this.selectedSortBy === 'Price Low to High')
          return Number(a.price_per_night) - Number(b.price_per_night);
        if (this.selectedSortBy === 'Price High to Low')
          return Number(b.price_per_night) - Number(a.price_per_night);
        if (this.selectedSortBy === 'Newest First')
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        return 0;
      });
  }

  isPriceInSelectedRange(price: number): boolean {
    for (const range of this.selectedPriceRanges) {
      const [min, max] = range.replace(/\₹/g, '').split(' to ').map(Number);
      if (price >= min && price <= max) return true;
    }
    return false;
  }

  toggleMobileFilters() {
    this.showMobileFilters = !this.showMobileFilters;
  }

  ngOnDestroy() {
    if (this.RoomServiceSubscription) {
      this.RoomServiceSubscription.unsubscribe();
    }
  }
}
