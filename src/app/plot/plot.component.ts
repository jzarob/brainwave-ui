import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlotService } from '../plot.service'
import * as Plotly from 'plotly.js';
import {Config, Data, Layout} from 'plotly.js';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css'],
  providers: [PlotService]
})
export class PlotComponent implements OnInit {
  @ViewChild('plot') el: ElementRef;
  private data: any;
  private layout: any;
  private element: any;

  constructor(private plotService: PlotService) { }

  ngOnInit() {
    this.configurePlot();
    this.plotService.onNewMessage().subscribe(msg => {
      console.log(msg);
      this.data = msg;
      Plotly.plot(this.element, [this.data], this.layout);
    });
  }

  configurePlot() {
    this.element = this.el.nativeElement;

    this.data = {
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 6, 10]
    }
  
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
}
