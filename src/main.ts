import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

// Vulnerability: No environment-specific configuration.
// Everything is hardcoded and runs in dev mode.

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient() // Vulnerability: No HTTP interceptors (no auth, no security)
  ]
});

