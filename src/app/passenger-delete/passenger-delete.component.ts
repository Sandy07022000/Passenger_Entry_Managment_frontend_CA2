import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PassengerService } from '../passenger.service';

@Component({
  selector: 'app-passenger-delete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './passenger-delete.component.html',
  styleUrls: ['./passenger-delete.component.css']
})
export class PassengerDeleteComponent {

  // Vulnerability: Stores raw API response (info disclosure)
  result: any = "";

  constructor(private api: PassengerService) {}

  delete(id: string) {
    // Injection fix: Sanitize and validate input
    const passengerId = Number(id);

    if (!passengerId || passengerId <= 0 || isNaN(passengerId)) {
      alert('Please enter a valid numeric Passenger ID.');
      return;
    }

    // NOTE: Confirmation dialog still missing (will fix later under Broken Access Control / Insecure Design)
    this.api.deletePassenger(passengerId).subscribe({
      next: () => {
        // Avoid raw backend JSON (i will improve info disclosure later)
        this.result = `Passenger with ID ${passengerId} deleted successfully.`;
      },
      error: err => {
        this.result = 'Error deleting passenger: ' + err.message;
      }
    });
  }
}
