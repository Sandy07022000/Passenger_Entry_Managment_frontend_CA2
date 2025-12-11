import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengerService } from '../passenger.service';

@Component({
  selector: 'app-passenger-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.css']
})
export class PassengerListComponent {

  // Vulnerability: Storing full DB records including sensitive data
  passengers: any[] = [];

  constructor(private api: PassengerService) {}

  loadPassengers() {
    // Injection Fix: No user input used in query, but added safe handling
    this.api.getAllPassengers().subscribe({
      next: (res: any[]) => {
        // Sanitize or safely map only expected fields
        this.passengers = res.map(p => ({
          passengerId: p.passengerId,
          fullName: p.fullName,
          passportNumber: p.passportNumber,
          visaType: p.visaType,
          nationality: p.nationality,
          arrivalDate: p.arrivalDate,
          arrivalYear: p.arrivalYear,
          purposeOfVisit: p.purposeOfVisit,
          officerId: p.officerId
        }));
      },
      error: err => {
        console.error('Error loading passengers:', err);
        alert('Failed to load passengers.');
      }
    });
  }
}
