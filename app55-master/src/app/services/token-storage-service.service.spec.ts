import { TestBed } from '@angular/core/testing';

import { TokenStorageServiceService } from './token-storage-service.service';

describe('TokenStorageServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenStorageServiceService = TestBed.get(TokenStorageServiceService);
    expect(service).toBeTruthy();
  });
});
