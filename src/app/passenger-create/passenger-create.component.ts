import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
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

  response: string = '';
  showReauth: boolean = false;

  constructor(private api: PassengerService, private auth: AuthService) {}

  // Triggered when form is submitted
  create(form: NgForm) {
    // Basic validation
    if (!this.fullName?.trim() || !this.passportNumber?.trim()) return;
    const yearNum = Number(this.arrivalYear);
    const officerNum = Number(this.officerId);
    if (yearNum && (yearNum < 1900 || yearNum > 2100)) return;
    if (!officerNum || officerNum < 1) return;

    // Show reauth popup before actual submission
    this.showReauth = true;

    // temporary message
    this.response = 'Please complete re-authentication to create passenger.';
  }

  // Called after successful reauthentication
  onReauthSuccess(form: NgForm) {
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
        form.resetForm(); // reset the form for next entry
      },
      error: err => {
        this.response = 'Error creating passenger: ' + err.message;
      }
    });
  }


  onReauthCancel() {
    this.showReauth = false;
    this.response = 'Re-authentication cancelled.';
  }
}
