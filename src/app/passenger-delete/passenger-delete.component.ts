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

    // Vulnerability: No input validation or sanitization
    // Vulnerability: Directly converts string to number, allowing invalid or malicious IDs
    this.api.deletePassenger(parseInt(id)).subscribe(res => {

      // Vulnerability: Shows full raw response
      this.result = JSON.stringify(res);

    });
  }
}
