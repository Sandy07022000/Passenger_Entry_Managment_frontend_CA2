import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PassengerService, Passenger } from '../passenger.service';
import { AuthService } from '../auth.service';
import { ReauthComponent } from '../reauth.component';

@Component({
  selector: 'app-passenger-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReauthComponent],
  templateUrl: './passenger-update.component.html',
  styleUrls: ['./passenger-update.component.css']
})
export class PassengerUpdateComponent {

  id: string = '';
  passenger: Passenger | null = null;
  response: any = '';

  // Re-auth state
  showReauth: boolean = false;
  pendingUpdateId: number | null = null;

  constructor(private api: PassengerService, private auth: AuthService) {}

  search() {
    const passengerId = Number(this.id);

    if (!passengerId || passengerId <= 0 || isNaN(passengerId)) {
      alert('Please enter a valid Passenger ID.');
      return;
    }

    this.api.searchPassenger(passengerId).subscribe({
      next: (res: Passenger) => {
        if (res) {
          this.passenger = {
            PassengerId: passengerId,
            FullName: res.FullName,
            PassportNumber: res.PassportNumber,
            VisaType: res.VisaType,
            Nationality: res.Nationality,
            ArrivalDate: res.ArrivalDate,
            ArrivalYear: res.ArrivalYear,
            PurposeOfVisit: res.PurposeOfVisit,
            OfficerId: res.OfficerId
          };
        } else {
          alert('No passenger found with this ID.');
        }
      },
      error: (err: any) => alert('Error fetching passenger: ' + err.message)
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

    // Save passengerId for reauth scope
    this.pendingUpdateId = passengerId;

    // Show re-auth modal
    this.showReauth = true;
  }

  // Called after successful reauthentication
  onReauthSuccess() {
    this.showReauth = false;

    if (!this.pendingUpdateId || !this.passenger) {
      alert('User session invalid. Please login again.');
      return;
    }

    const safePassenger: Partial<Passenger> = {
      FullName: this.passenger.FullName?.trim(),
      PassportNumber: this.passenger.PassportNumber?.trim(),
      VisaType: this.passenger.VisaType?.trim(),
      Nationality: this.passenger.Nationality?.trim(),
      ArrivalDate: this.passenger.ArrivalDate,
      ArrivalYear: Number(this.passenger.ArrivalYear),
      PurposeOfVisit: this.passenger.PurposeOfVisit?.trim(),
      OfficerId: Number(this.passenger.OfficerId)
    };

    if (isNaN(safePassenger.ArrivalYear!) || safePassenger.ArrivalYear! < 1900 || safePassenger.ArrivalYear! > 2100) {
      alert('Arrival year must be between 1900 and 2100.');
      return;
    }

    if (isNaN(safePassenger.OfficerId!) || safePassenger.OfficerId! < 1) {
      alert('Officer ID must be a valid number greater than 0.');
      return;
    }

    const updateId = this.pendingUpdateId;
    this.pendingUpdateId = null;

    this.api.updatePassenger(updateId, safePassenger).subscribe({
      next: () => this.response = 'Passenger updated successfully.',
      error: (err: any) => this.response = 'Error updating passenger: ' + err.message
    });
  }

  // Called if user cancels reauthentication
  onReauthCancel() {
    this.showReauth = false;
    this.pendingUpdateId = null;
    alert('Re-authentication cancelled.');
  }
}
