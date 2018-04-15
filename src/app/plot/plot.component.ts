import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { PlotService } from '../plot.service'
import { WaveformService } from '../waveform.service'
import * as Plotly from 'plotly.js';
import {Config, Data, Layout} from 'plotly.js';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit, AfterViewInit {
  @ViewChild('plot') el: ElementRef;
  private data: any;
  private layout: any;
  private element: any;
  private wavesurfer: any;
  private wavesurferReady: boolean;
  private readySubscription: any;

  constructor(private plotService: PlotService, private waveformService: WaveformService) { }

  ngOnInit() {
    this.configurePlot();
    this.plotService.onNewMessage().subscribe(msg => {
      console.log(msg);
      this.data = msg;
      this.data.mode = 'markers';
      this.data.type = 'scatter';
      Plotly.react(this.element, [this.data], this.layout);
    });
  }

  ngAfterViewInit(){
    console.log('in after view');
    this.waveformService.getFinishObservable().subscribe((val) => {
      this.stopRecording();
    });
    this.readySubscription = this.waveformService.getReadyObservable().subscribe((val) => {
      this.wavesurferReady = val;
      console.log('plot componenet wave surfer status', val);
      if (val) {
        this.wavesurfer = this.waveformService.wavesurfer;
      }
    });
  }

  ngOnDestroy() {
    this.readySubscription.unsubscribe();
  }


  configurePlot() {
    this.element = this.el.nativeElement;

    this.data = {
      x: [0.5, 0.7, 0.9],
      y: [0.1, 0.2, 0.3],
      type: 'scatter',
      mode: 'markers'
    };

    this.layout = {
      title: 'Mood Chart',
      margin: {
        t: 50
      },
      xaxis: {
        range: [-1.0, 1.0]
      },
      yaxis: {
        range: [-1.0, 1.0]
      }
    }

    Plotly.plot(this.element, [this.data], this.layout);
  }

  startRecording() {
    if (!this.wavesurferReady)
      return;
    this.wavesurfer.play();
    this.plotService.startRecording();
  }

  stopRecording() {
    this.plotService.stopRecording();
    if (this.wavesurferReady)
      this.wavesurfer.pause();
  }

  togglePlay() {
    if (!this.wavesurferReady)
      return;
    if (this.wavesurfer.isPlaying()) {
      this.wavesurfer.pause();
    } else {
      this.plotService.stopRecording();
      const measuredValues = this.plotService.getMeasuredValues();
      var keys = Object.keys(measuredValues).map(val => {
        return +val;
      });
      // keys = keys.sort();
      var smallestKey = keys[0];
      var largestKey = keys[keys.length-1];
      this.wavesurfer.play(smallestKey, largestKey);
      this.plotService.playFromRecording();
    }
  }
}
