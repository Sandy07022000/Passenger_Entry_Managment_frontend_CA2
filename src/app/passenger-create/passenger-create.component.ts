import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PassengerService } from '../passenger.service';

@Component({
  selector: 'app-passenger-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './passenger-create.component.html',
  styleUrls: ['./passenger-create.component.css']
})
export class PassengerCreateComponent {

  // Vulnerability: No client-side validation
  // Vulnerability: Accepts unsafe strings (XSS, SQLi payloads)
  fullName: string = '';
  passportNumber: string = '';
  visaType: string = '';
  nationality: string = '';
  arrivalDate: string = '';
  arrivalYear: string = '';
  purposeOfVisit: string = '';
  officerId: string = '';

  response: any = "";

  constructor(private api: PassengerService) {}

create() {
  // Trim and validate inputs before submission
  if (!this.fullName?.trim() || !this.passportNumber?.trim()) {
    alert('Full Name and Passport Number are required.');
    return;
  }

  // Validate numeric fields
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

  // safe payload
  const body = {
    FullName: this.fullName.trim(),
    PassportNumber: this.passportNumber.trim(),
    VisaType: this.visaType.trim(),
    Nationality: this.nationality.trim(),
    ArrivalDate: this.arrivalDate,
    ArrivalYear: yearNum,
    PurposeOfVisit: this.purposeOfVisit.trim(),
    OfficerId: officerNum
  };

  this.api.createPassenger(body).subscribe({
    next: () => {
      this.response = 'Passenger created successfully.';
      // Optional: clear form
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


}
