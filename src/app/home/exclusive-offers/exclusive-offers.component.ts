import { NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { exclusiveOffers } from '../../../assets/assets';

@Component({
  selector: 'app-exclusive-offers',
  imports: [NgFor, NgStyle, FormsModule],
  templateUrl: './exclusive-offers.component.html',
  styleUrls: ['./exclusive-offers.component.css'],
})
export class ExclusiveOffersComponent {
  exclusiveOffers = exclusiveOffers;

  trackByOfferId(index: number, offer: any): number {
    return offer._id;
  }
}
