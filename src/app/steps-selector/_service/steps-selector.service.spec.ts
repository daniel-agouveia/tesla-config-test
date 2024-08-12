import { TestBed } from '@angular/core/testing';

import { StepsSelectorService } from './steps-selector.service';

describe('StepsSelectorService', () => {
  let service: StepsSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepsSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
