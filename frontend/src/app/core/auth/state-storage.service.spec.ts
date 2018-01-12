import { TestBed, inject } from '@angular/core/testing';

import { StateStorageService } from './state-storage.service';

describe('StateStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateStorageService]
    });
  });

  it('should be created', inject([StateStorageService], (service: StateStorageService) => {
    expect(service).toBeTruthy();
  }));
});
