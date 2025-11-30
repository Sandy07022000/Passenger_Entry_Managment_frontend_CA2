import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PassengerService } from '../passenger.service';

@Component({
  selector: 'app-passenger-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './passenger-search.component.html',
  styleUrls: ['./passenger-search.component.css']
})
export class PassengerSearchComponent {

  // Vulnerability: No type restrictions (string accepted for ID)
  query: string = '';

  // Vulnerability: May expose sensitive DB fields
  results: any = null;

  constructor(private service: PassengerService) {}

  search() {

    // Vulnerability: No input validation (user may pass negative, empty, or string values)
    this.service.searchPassenger(Number(this.query)).subscribe((res: any) => {

      // Vulnerability: No sanitization of returned values (XSS risk)
      this.results = res;

    });
  }
}
