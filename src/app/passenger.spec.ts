import { TestBed } from '@angular/core/testing';

import { Passenger } from './passenger';

describe('Passenger', () => {
  let service: Passenger;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Passenger);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
