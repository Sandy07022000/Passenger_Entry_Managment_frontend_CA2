import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-reauth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reauth.component.html',
})
export class ReauthComponent {
  password: string = '';
  @Output() reauthSuccess = new EventEmitter<void>();
  @Output() reauthCancel = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  confirm() {
    const currentUser = this.authService.getUser();
    if (!currentUser) {
      alert('User not logged in.');
      this.reauthCancel.emit();
      return;
    }

    this.authService.login(currentUser.username, this.password).subscribe({
      next: () => {
        this.password = '';
        this.reauthSuccess.emit();
      },
      error: () => {
        alert('Incorrect password. Re-authentication failed.');
        this.password = '';
      }
    });
  }

  cancel() {
    this.password = '';
    this.reauthCancel.emit();
  }
}
