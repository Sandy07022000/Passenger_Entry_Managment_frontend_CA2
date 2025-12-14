import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PassengerService } from '../passenger.service';
import { ReauthComponent } from '../reauth.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-passenger-delete',
  standalone: true,
  imports: [CommonModule, FormsModule, ReauthComponent],
  templateUrl: './passenger-delete.component.html',
  styleUrls: ['./passenger-delete.component.css']
})
export class PassengerDeleteComponent {
  passengerId: number | null = null;
  result: string = '';
  showReauth: boolean = false;
  pendingDeleteId: number | null = null;

  constructor(private api: PassengerService, private auth: AuthService) {}

  delete(deleteForm: NgForm) {
    if (!this.passengerId || this.passengerId <= 0) {
      this.result = 'Please enter a valid numeric Passenger ID.';
      return;
    }

    // re-authentication before performing delete
    this.pendingDeleteId = this.passengerId;
    this.showReauth = true;
    this.result = ''; // clear old messages
  }

  // Triggered when re-authentication succeeds
  onReauthSuccess(deleteForm: NgForm) {
    this.showReauth = false;

    if (!this.pendingDeleteId) return;

    this.api.deletePassenger(this.pendingDeleteId).subscribe({
      next: () => {
        this.result = `Passenger with ID ${this.pendingDeleteId} deleted successfully.`;
        this.pendingDeleteId = null;
        deleteForm.resetForm(); 
      },
      error: (err) => {
        this.result = 'Error deleting passenger: ' + err.message;
        this.pendingDeleteId = null;
      }
    });
  }

  // Called if re-auth is cancelled
  onReauthCancel(deleteForm: NgForm) {
    this.showReauth = false;
    this.pendingDeleteId = null;
    deleteForm.resetForm(); 
    this.result = ''; // 
  }
}
