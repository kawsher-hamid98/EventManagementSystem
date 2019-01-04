import { TestBed } from '@angular/core/testing';

import { GeneralEventServiceService } from './general-event-service.service';

describe('GeneralEventServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralEventServiceService = TestBed.get(GeneralEventServiceService);
    expect(service).toBeTruthy();
  });
});
