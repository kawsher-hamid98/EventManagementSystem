import { TestBed } from '@angular/core/testing';

import { SpecialEventServiceService } from './special-event-service.service';

describe('SpecialEventServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecialEventServiceService = TestBed.get(SpecialEventServiceService);
    expect(service).toBeTruthy();
  });
});
