import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlotService } from '../plot.service'
import * as Plotly from 'plotly.js';
import {Config, Data, Layout} from 'plotly.js';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {
  @ViewChild('plot') el: ElementRef;

  constructor(private plotService: PlotService) { }

  ngOnInit() {
    this.configurePlot();
    this.plotService.onNewMessage().subscribe(msg => {
      console.log(msg);
    });
  }

  configurePlot() {
    const element = this.el.nativeElement;

    const data = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 6, 10]
    }]
  
    const style = {
      margin: {t: 0}
    }

    Plotly.plot(element, data, style);
  }
}
