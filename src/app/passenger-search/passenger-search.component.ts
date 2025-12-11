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

  results: any = null;

  constructor(private service: PassengerService) {}

  search() {
    // Injection Fix: Validate and sanitize input before backend call
    const id = Number(this.query);

    if (!id || id <= 0 || isNaN(id)) {
      alert('Please enter a valid numeric Passenger ID.');
      return;
    }

    // Safe backend call
    this.service.searchPassenger(id).subscribe({
      next: (res: any) => {
        // Sanitize response fields to prevent rendering of injected scripts
        if (res) {
          this.results = {
            fullName: res.fullName,
            passportNumber: res.passportNumber,
            visaType: res.visaType,
            nationality: res.nationality,
            arrivalDate: res.arrivalDate,
            arrivalYear: res.arrivalYear,
            purposeOfVisit: res.purposeOfVisit,
            officerId: res.officerId
          };
        } else {
          this.results = null;
          alert('No passenger found with this ID.');
        }
      },
      error: err => {
        this.results = null;
        alert('Error fetching passenger: ' + err.message);
      }
    });
  }
}
