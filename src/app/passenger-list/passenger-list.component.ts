import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PassengerService, Passenger } from '../passenger.service';

@Component({
  selector: 'app-passenger-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.css']
})
export class PassengerListComponent {
  passengers: Passenger[] = [];
  message = '';

  constructor(private passengerService: PassengerService) {}

  // Called when List button is clicked
  loadPassengers(listForm: NgForm) {
    this.message = ''; // clear previous messages
    this.passengerService.getAll().subscribe({
      next: (data) => {
        this.passengers = data;
        if (data.length === 0) {
          this.message = 'No passengers found.';
        }
        listForm.resetForm({}); // optional: resets form state if needed
      },
      error: (err) => {
        this.passengers = [];
        this.message = 'Error loading passengers: ' + err.message;
      }
    });
  }
}
