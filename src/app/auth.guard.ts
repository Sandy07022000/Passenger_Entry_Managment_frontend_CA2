import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  //ensures only logged-in users can access protected routes.

  if (!auth.isAuthenticated()) {
    router.navigate(['/']); // redirect to login
    return false;
  }
  return true;
};
