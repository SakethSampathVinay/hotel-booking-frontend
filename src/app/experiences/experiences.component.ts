import { Component } from '@angular/core';

@Component({
  selector: 'app-experiences',
  imports: [],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css',
})
export class ExperiencesComponent {
  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
