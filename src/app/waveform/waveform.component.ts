import { Component, OnInit, AfterViewInit, Output } from '@angular/core';
import * as WaveSurfer from 'wavesurfer.js';
import { WaveformService } from '../waveform.service';

@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css']
})
export class WaveformComponent implements OnInit, AfterViewInit {

  wavesurfer: any;


  constructor(private waveformService: WaveformService) { }

  ngOnInit() {  }

  ngAfterViewInit() {
    requestAnimationFrame(() => {
      this.wavesurfer = WaveSurfer.create({
        container: '#wavesurfer',
        waveColor: 'blue',
        progressColor: 'white'
      });

      this.waveformService.wavesurfer = this.wavesurfer;

    });
  }

}
