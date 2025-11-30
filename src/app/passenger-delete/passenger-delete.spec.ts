import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerDelete } from './passenger-delete';

describe('PassengerDelete', () => {
  let component: PassengerDelete;
  let fixture: ComponentFixture<PassengerDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
