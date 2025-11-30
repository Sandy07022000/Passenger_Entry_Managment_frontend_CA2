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

  // Vulnerability: Raw object directly linked to form fields enabling overposting
  passenger: any = null;

  // Vulnerability: Sensitive response data is displayed
  response: any = '';

  constructor(private api: PassengerService) {}

  search() {
    // Vulnerability: No validation or empty check
    this.api.searchPassenger(Number(this.id)).subscribe((res: any) => {
      this.passenger = res;
    });
  }

  update() {
    // Vulnerability: No validation, sends raw object directly
    this.api.updatePassenger(Number(this.id), this.passenger).subscribe(res => {
      this.response = JSON.stringify(res);
    });
  }
}
