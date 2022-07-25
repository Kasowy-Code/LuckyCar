import {TestBed} from '@angular/core/testing';

import {LotteryPermissionService} from './lottery-permission.service';

describe('LotteryPermissionService', () => {
  let service: LotteryPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotteryPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
