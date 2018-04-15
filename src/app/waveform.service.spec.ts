import { TestBed, inject } from '@angular/core/testing';

import { WaveformService } from './waveform.service';

describe('WaveformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WaveformService]
    });
  });

  it('should be created', inject([WaveformService], (service: WaveformService) => {
    expect(service).toBeTruthy();
  }));
});
