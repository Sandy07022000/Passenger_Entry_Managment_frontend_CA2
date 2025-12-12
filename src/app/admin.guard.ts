import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AdminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.getUser();
  if (!user || user.role !== 'Admin') {
    router.navigate(['/search']); // redirect to safe user page
    return false;
  }
  return true;
};
