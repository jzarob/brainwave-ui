import { Component, OnInit, AfterViewInit, Output } from '@angular/core';
import * as WaveSurfer from 'wavesurfer.js';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css']
})
export class WaveformComponent implements OnInit, AfterViewInit {

  wavesurfer: any = null;

  @Output()
  timeChanged: EventEmitter = new EventEmitter();

  @Output()
  paused: EventEmitter = new EventEmitter();

  @Output()
  play: EventEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    requestAnimationFrame(() => {
      this.wavesurfer = WaveSurfer.create({
        container: '#wavesurfer',
        waveColor: 'blue',
        progressColor: 'white'
      });

      this.wavesurfer.load('assets/black-parade.wav');

      this.wavesurfer.on('seek', (progress) => {
        this.timeChanged.emit(progress);
      });

      this.wavesurfer.on('play', () => {
        this.play.emit(null);
      });

      this.wavesurfer.on('pause', () => {
        this.paused.emit(null);
        });
    });
  }

  togglePlay() {
    if (this.wavesurfer.isPlaying()) {
      this.wavesurfer.pause();
    } else {
      this.wavesurfer.play();
    }
  }

}
