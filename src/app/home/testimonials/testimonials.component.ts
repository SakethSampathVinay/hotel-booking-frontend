import { Component } from '@angular/core';
import { testimonials } from '../../../assets/assets';
import { CommonEngine } from '@angular/ssr/node';
import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
})
export class TestimonialsComponent {
  testimonials = testimonials;

  trackByTestimonalId(index: number, testimonial: any): number {
    return testimonial.id;
  }
}
