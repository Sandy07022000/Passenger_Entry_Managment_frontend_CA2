import { Component } from '@angular/core';
import { CommonModule, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { PassengerCreateComponent } from './passenger-create/passenger-create.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { PassengerUpdateComponent } from './passenger-update/passenger-update.component';
import { PassengerDeleteComponent } from './passenger-delete/passenger-delete.component';
import { PassengerListComponent } from './passenger-list/passenger-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    PassengerCreateComponent,
    PassengerSearchComponent,
    PassengerUpdateComponent,
    PassengerDeleteComponent,
    PassengerListComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Passenger Management';
  current: string = 'create'; // default view

  navigate(view: string) {
    this.current = view;
  }
}
