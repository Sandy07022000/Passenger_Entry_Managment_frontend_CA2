import { Routes } from '@angular/router';
import { PassengerCreateComponent } from './passenger-create/passenger-create.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { PassengerDeleteComponent } from './passenger-delete/passenger-delete.component';

export const routes: Routes = [
    { path: "create", component: PassengerCreateComponent },
    { path: "search", component: PassengerSearchComponent },
    { path: "delete", component: PassengerDeleteComponent },
    { path: "**", redirectTo: "create" } // insecure fallback
];
