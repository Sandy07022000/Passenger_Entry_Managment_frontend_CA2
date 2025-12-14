import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  result: any = "";
  showReauth: boolean = false;
  pendingDeleteId: number | null = null;

  constructor(private api: PassengerService, private auth: AuthService) {}

  delete(id: string) {
    const passengerId = Number(id);

    if (!passengerId || passengerId <= 0 || isNaN(passengerId)) {
      alert('Please enter a valid numeric Passenger ID.');
      return;
    }

    // re-authentication before performing delete
    this.pendingDeleteId = passengerId;
    this.showReauth = true;
  }

  // Triggered when re-authentication succeeds
  onReauthSuccess() {
    this.showReauth = false;

    if (!this.pendingDeleteId) return;

    this.api.deletePassenger(this.pendingDeleteId).subscribe({
      next: () => {
        this.result = `Passenger with ID ${this.pendingDeleteId} deleted successfully.`;
        this.pendingDeleteId = null;
      },
      error: err => {
        this.result = 'Error deleting passenger: ' + err.message;
        this.pendingDeleteId = null;
      }
    });
  }

  // Called if re-auth is cancelled
  onReauthCancel() {
    this.showReauth = false;
    this.pendingDeleteId = null;
    alert('Re-authentication cancelled.');
  }
}
