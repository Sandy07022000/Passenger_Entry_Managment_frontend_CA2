import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengerService, Passenger } from '../passenger.service';

@Component({
  selector: 'app-passenger-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.css']
})
export class PassengerListComponent implements OnInit {

  passengers: Passenger[] = [];
  message = '';

  constructor(private passengerService: PassengerService) {}

  ngOnInit() {
    this.loadPassengers();
  }
  loadPassengers() {
    // Injection Fix: No user input used in query, but added safe handling
    this.passengerService.getAll().subscribe({
      next: (data) => {
        this.passengers = data;
      },
      error: (err) => {
        this.message = 'Error loading passengers: ' + err.message;
      }
    });
  }
}
