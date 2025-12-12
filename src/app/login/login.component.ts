import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      this.message = 'Username and password are required.';
      return;
    }

    // Call AuthService with two arguments
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.message = 'Login successful. Redirecting...';
        // Redirect after short delay
        setTimeout(() => {
          this.router.navigate(['/create']); // Default page after login
        }, 1000);
      },
      error: (err) => {
        this.message = 'Login failed: ' + (err.error || err.message);
      }
    });
  }
}

