import { TestBed, inject } from '@angular/core/testing';

import { ReuseTabService } from './reuse-tab.service';

describe('ReuseTabService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReuseTabService]
    });
  });

  it('should be created', inject([ReuseTabService], (service: ReuseTabService) => {
    expect(service).toBeTruthy();
  }));
});
