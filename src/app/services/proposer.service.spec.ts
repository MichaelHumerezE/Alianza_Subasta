import { TestBed } from '@angular/core/testing';

import { ProposerService } from './proposer.service';

describe('ProposerService', () => {
  let service: ProposerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProposerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
