import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PassengerService, Passenger } from '../passenger.service';

@Component({
  selector: 'app-passenger-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './passenger-search.component.html',
  styleUrls: ['./passenger-search.component.css']
})
export class PassengerSearchComponent {
  passengerId!: number;
  passenger?: Passenger;
  message = '';

  constructor(private passengerService: PassengerService) {}

  search() {
    if (!this.passengerId) {
      this.message = 'Please enter a Passenger ID.';
      return;
    }

    this.passengerService.get(this.passengerId).subscribe({
      next: (data) => {
        this.passenger = data;
        this.message = '';
      },
      error: (err) => {
        this.passenger = undefined;
        this.message = 'Passenger not found or unauthorized.';
      }
    });
  }
}
