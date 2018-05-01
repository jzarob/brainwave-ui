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
      this.options = this.waveformService.getSongOptions();
      this.optionSelected = this.options[0].fileName;
      this.waveformService.getNewSongObservable().subscribe((i:number) => {
        this.optionSelected = this.options[i].fileName;
      });
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
