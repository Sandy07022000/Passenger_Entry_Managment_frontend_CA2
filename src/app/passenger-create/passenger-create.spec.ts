import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerCreate } from './passenger-create';

describe('PassengerCreate', () => {
  let component: PassengerCreate;
  let fixture: ComponentFixture<PassengerCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
