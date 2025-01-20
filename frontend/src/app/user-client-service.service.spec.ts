import { TestBed } from '@angular/core/testing';

import { UserClientServiceService } from './user-client-service.service';

describe('UserClientServiceService', () => {
  let service: UserClientServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserClientServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
