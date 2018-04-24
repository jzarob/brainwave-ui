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
  options: any;
  optionSelected: any;


  constructor(private waveformService: WaveformService) { }

  ngOnInit() {  
      this.options = [
          {displayName: 'Welcome to the Black Parade', fileName: 'assets/black-parade.wav'},
          {displayName: 'Bohemian Rhapsody', fileName: 'assets/bohemian-rhapsody.wav'},
          {displayName: 'The Algorithm', fileName: 'assets/the-algorithm.wav'},
          {displayName: 'From a Whisper to a Scream', fileName: 'assets/from-a-whisper-to-a-scream.wav'}
      ];

      this.optionSelected = this.options[0].fileName;
  }

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

    onOptionSelected(event) {
        this.waveformService.loadSong(event);
    }

}
