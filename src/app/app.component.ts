import { Component } from '@angular/core';
import { PassengerCreateComponent } from './passenger-create/passenger-create.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { PassengerDeleteComponent } from './passenger-delete/passenger-delete.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PassengerCreateComponent, PassengerSearchComponent, PassengerDeleteComponent],
  template: `
    <h1>Passenger Management</h1>
    <app-passenger-create></app-passenger-create>
    <app-passenger-search></app-passenger-search>
    <app-passenger-delete></app-passenger-delete>
  `
})
export class AppComponent { }
