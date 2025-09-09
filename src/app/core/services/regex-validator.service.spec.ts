import { TestBed } from '@angular/core/testing';

import { RegexValidatorService } from './regex-validator.service';

describe('RegexValidatorService', () => {
  let service: RegexValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegexValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
