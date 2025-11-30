import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengerService } from '../passenger.service';

@Component({
  selector: 'app-passenger-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.css']
})
export class PassengerListComponent {

  // Vulnerability: Storing full DB records including sensitive data
  passengers: any[] = [];

  constructor(private api: PassengerService) {}

  loadPassengers() {
    // Vulnerability: No error handling or sanitization
    this.api.getAllPassengers().subscribe((res: any[]) => {
      this.passengers = res;
    });
  }
}
