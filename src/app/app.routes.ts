import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PassengerCreateComponent } from './passenger-create/passenger-create.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { PassengerUpdateComponent } from './passenger-update/passenger-update.component';
import { PassengerDeleteComponent } from './passenger-delete/passenger-delete.component';
import { PassengerListComponent } from './passenger-list/passenger-list.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'create', component: PassengerCreateComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'search', component: PassengerSearchComponent, canActivate: [AuthGuard] },
  { path: 'update', component: PassengerUpdateComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'delete', component: PassengerDeleteComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'list', component: PassengerListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
