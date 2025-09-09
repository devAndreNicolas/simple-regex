import { TestBed } from '@angular/core/testing';

import { RegexExplainerService } from './regex-explainer.service';

describe('RegexExplainerService', () => {
  let service: RegexExplainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegexExplainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
