import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlotService {
  private socket: any;
  private stats: any;
  private smoothPrevious: any;
  private weight: any;

  constructor() { 
    this.socket = io('https://localhost:5000');
    this.weight = 0.15;
    this.stats = {
      alpha: {
        mean: 1,
        variance: 4
      },
      beta: {
        mean: 1,
        variance: 4
      }
    }
    this.smoothPrevious = null;
  }

  onNewMessage() {
    return Observable.create(observer => {
      this.socket.on('message', msg => {
        msg = this.calculateRelative(msg);
        msg = this.smooth(msg);
        observer.next(this.mapToGrid(msg));
      });
    });
  }

  mapToAxis(value, stats) {
    var std_dev = Math.sqrt(this.stats.variance);
    var z = (value - this.stats.mean) / (2*std_dev);
    if (z < -1)
      return -1;
    else if (z > 1)
      return 1;
    return z;
  }

  mapToGrid(nonMappedPoint) {
    return {
      x: this.mapToAxis(nonMappedPoint.alpha, this.stats.alpha),
      y: this.mapToAxis(nonMappedPoint.beta, this.stats.beta)
    }
  }

  calculateRelative(msg) {
    var sum = 0;
    for (var val of msg) {
      sum += val;
    };
    return {
      alpha: msg.alpha / sum,
      beta: msg.beta / sum
    };
  }

  smooth(msg) {
    if (this.smoothPrevious == null) {
      this.smoothPrevious = {
        alpha: msg.alpha,
        beta: msg.beta
      }
      return msg;
    } else {
      this.smoothPrevious = {
        alpha: this.smoothPrevious.alpha * (1-this.weight) + msg.alpha * (this.weight),
        beta: this.smoothPrevious.beta * (1-this.weight) + msg.beta * (this.weight)
      }
      return this.smoothPrevious;
    }
  }
}

