import { TestBed } from '@angular/core/testing';

import { PageServiceService } from './page-service.service';

describe('PageServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageServiceService = TestBed.get(PageServiceService);
    expect(service).toBeTruthy();
  });
});
