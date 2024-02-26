import { TestBed } from '@angular/core/testing';

import { DataToInterfaceService } from './data-to-interface.service';

describe('DataToInterfaceService', () => {
  let service: DataToInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataToInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
