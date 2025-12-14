import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PassengerService } from '../passenger.service';
import { ReauthComponent } from '../reauth.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-passenger-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReauthComponent],
  templateUrl: './passenger-create.component.html',
  styleUrls: ['./passenger-create.component.css']
})
export class PassengerCreateComponent {
  fullName: string = '';
  passportNumber: string = '';
  visaType: string = '';
  nationality: string = '';
  arrivalDate: string = '';
  arrivalYear: string = '';
  purposeOfVisit: string = '';
  officerId: string = '';

  response: any = '';
  showReauth: boolean = false;

  constructor(private api: PassengerService, private auth: AuthService) {}

  create() {
    if (!this.fullName?.trim() || !this.passportNumber?.trim()) {
      alert('Full Name and Passport Number are required.');
      return;
    }

    const yearNum = Number(this.arrivalYear);
    const officerNum = Number(this.officerId);

    if (yearNum && (yearNum < 1900 || yearNum > 2100)) {
      alert('Arrival Year must be between 1900 and 2100.');
      return;
    }

    if (!officerNum || officerNum < 1) {
      alert('Officer ID must be a valid number greater than 0.');
      return;
    }

    // reauth instead of submitting immediately
    this.showReauth = true;
  }

  // Called after successful reauthentication
  onReauthSuccess() {
    this.showReauth = false;

    const body = {
      FullName: this.fullName.trim(),
      PassportNumber: this.passportNumber.trim(),
      VisaType: this.visaType.trim(),
      Nationality: this.nationality.trim(),
      ArrivalDate: this.arrivalDate,
      ArrivalYear: Number(this.arrivalYear),
      PurposeOfVisit: this.purposeOfVisit.trim(),
      OfficerId: Number(this.officerId)
    };

    this.api.createPassenger(body).subscribe({
      next: () => {
        this.response = 'Passenger created successfully.';
        this.fullName = this.passportNumber = this.visaType = this.nationality =
          this.purposeOfVisit = this.arrivalDate = '';
        this.arrivalYear = '';
        this.officerId = '';
      },
      error: err => {
        this.response = 'Error creating passenger: ' + err.message;
      }
    });
  }


  onReauthCancel() {
    this.showReauth = false;
    alert('Re-authentication cancelled.');
  }
}
