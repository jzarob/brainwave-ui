import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlotService } from '../plot.service'
import { WaveformService } from '../waveform.service'
import * as Plotly from 'plotly.js';
import {Config, Data, Layout} from 'plotly.js';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css'],
  providers: [PlotService, WaveformService]
})
export class PlotComponent implements OnInit {
  @ViewChild('plot') el: ElementRef;
  private data: any;
  private layout: any;
  private element: any;

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
    this.waveformService.getFinishObservable().subscribe((val) => {
      this.stopRecording();
    });
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
    this.plotService.startRecording();
  }

  stopRecording() {
    this.plotService.stopRecording();
  }
}
