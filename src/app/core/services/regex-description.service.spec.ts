import { TestBed } from '@angular/core/testing';

import { RegexDescriptionService } from './regex-description.service';

describe('RegexDescriptionService', () => {
  let service: RegexDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegexDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
