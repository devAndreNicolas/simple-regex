import { TestBed } from '@angular/core/testing';

import { RegexGeneratorService } from './regex-generator.service';

describe('RegexGeneratorService', () => {
  let service: RegexGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegexGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
