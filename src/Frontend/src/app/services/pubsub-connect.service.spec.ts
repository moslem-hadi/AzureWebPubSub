import { TestBed } from '@angular/core/testing';

import { PubsubConnectService } from './pubsub-connect.service';

describe('PubsubConnectService', () => {
  let service: PubsubConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PubsubConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
