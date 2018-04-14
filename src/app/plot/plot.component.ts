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
      alpha: {
          "max": 0.4176603081056414,
          "min": 0.016835995035434276,
          "mean": 0.1966480039590039,
          "variance": 0.004850732463785751
      },
      beta: {
          "max": 0.9409940446576599,
          "min": 0.054656648524500515,
          "mean": 0.5056359355383458,
          "variance": 0.03426381912385437
      }
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
}
