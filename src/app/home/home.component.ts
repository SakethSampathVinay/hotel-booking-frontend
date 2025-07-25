import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { FeaturedDestinationComponent } from './featured-destination/featured-destination.component';
import { ExclusiveOffersComponent } from './exclusive-offers/exclusive-offers.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { StayInspiredComponent } from './stay-inspired/stay-inspired.component';
import { FooterComponent } from '../footer/footer.component';
import { ChatbotComponent } from "../chatbot/chatbot.component";

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    FeaturedDestinationComponent,
    ExclusiveOffersComponent,
    TestimonialsComponent,
    StayInspiredComponent,
    ChatbotComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
