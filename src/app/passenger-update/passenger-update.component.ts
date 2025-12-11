import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PassengerService } from '../passenger.service';

@Component({
  selector: 'app-passenger-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './passenger-update.component.html',
  styleUrls: ['./passenger-update.component.css']
})
export class PassengerUpdateComponent {

  // Vulnerability: User input not validated or sanitized
  id: string = '';
  passenger: any = null;
  response: any = '';

  constructor(private api: PassengerService) {}

  search() {
    // Injection Fix: Validate numeric input before backend call
    const passengerId = Number(this.id);

    if (!passengerId || passengerId <= 0 || isNaN(passengerId)) {
      alert('Please enter a valid Passenger ID.');
      return;
    }

    this.api.searchPassenger(passengerId).subscribe({
      next: (res: any) => {
        if (res) {
          // Prevents binding unsanitized objects
          this.passenger = {
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
          alert('No passenger found with this ID.');
        }
      },
      error: err => {
        alert('Error fetching passenger: ' + err.message);
      }
    });
  }

  update() {
    const passengerId = Number(this.id);
    if (!passengerId || passengerId <= 0 || isNaN(passengerId)) {
      alert('Invalid Passenger ID.');
      return;
    }

    if (!this.passenger) {
      alert('Please load passenger details before updating.');
      return;
    }

    // Sanitize input fields before sending
    const safePassenger = {
      fullName: this.passenger.fullName?.trim(),
      passportNumber: this.passenger.passportNumber?.trim(),
      visaType: this.passenger.visaType?.trim(),
      nationality: this.passenger.nationality?.trim(),
      arrivalDate: this.passenger.arrivalDate,
      arrivalYear: Number(this.passenger.arrivalYear),
      purposeOfVisit: this.passenger.purposeOfVisit?.trim(),
      officerId: Number(this.passenger.officerId)
    };

    // Validate numeric fields
    if (isNaN(safePassenger.arrivalYear) || safePassenger.arrivalYear < 1900 || safePassenger.arrivalYear > 2100) {
      alert('Arrival year must be between 1900 and 2100.');
      return;
    }

    if (isNaN(safePassenger.officerId) || safePassenger.officerId < 1) {
      alert('Officer ID must be a valid number greater than 0.');
      return;
    }

    // Safe API call
    this.api.updatePassenger(passengerId, safePassenger).subscribe({
      next: () => {
        this.response = 'Passenger updated successfully.';
      },
      error: err => {
        this.response = 'Error updating passenger: ' + err.message;
      }
    });
  }
}
