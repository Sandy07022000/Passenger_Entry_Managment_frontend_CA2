import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerUpdate } from './passenger-update';

describe('PassengerUpdate', () => {
  let component: PassengerUpdate;
  let fixture: ComponentFixture<PassengerUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
