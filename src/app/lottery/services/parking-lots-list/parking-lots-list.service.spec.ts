import { TestBed } from '@angular/core/testing';

import { ParkingLotsListService } from './parking-lots-list.service';

describe('ParkingLotsListService', () => {
  let service: ParkingLotsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingLotsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
