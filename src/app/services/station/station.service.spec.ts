import {TestBed} from '@angular/core/testing';

import {StationService} from './station.service';

describe('StationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StationService = TestBed.get(StationService);
    expect(service).toBeTruthy();
  });
});
