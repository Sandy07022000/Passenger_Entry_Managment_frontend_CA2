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

    // Vulnerability: Raw input directly mapped to backend model (overposting)
    // Vulnerability: No sanitization or escaping of dangerous characters
    const body = {
      FullName: this.fullName,
      PassportNumber: this.passportNumber,
      VisaType: this.visaType,
      Nationality: this.nationality,
      ArrivalDate: this.arrivalDate,
      ArrivalYear: this.arrivalYear,
      PurposeOfVisit: this.purposeOfVisit,
      OfficerId: this.officerId
    };

    this.api.createPassenger(body).subscribe(res => {
      // Vulnerability: Prints full response (info exposure)
      this.response = JSON.stringify(res);
    });
  }
}
