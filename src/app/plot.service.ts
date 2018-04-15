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
    this.socket = io('http://localhost:5000');
    this.weight = 0.15;
    this.stats = {
      alpha: {
          'max': 0.4176603081056414,
          'min': 0.016835995035434276,
          'mean': 0.1966480039590039,
          'variance': 0.004850732463785751
      },
      beta: {
          'max': 0.9409940446576599,
          'min': 0.054656648524500515,
          'mean': 0.5056359355383458,
          'variance': 0.03426381912385437
      }
    };
    this.smoothPrevious = null;
  }

  onNewMessage() {
    return Observable.create(observer => {
      this.socket.on('message', msg => {
        msg = JSON.parse(msg);
        msg = this.calculateRelative(msg);
        msg = this.smooth(msg);
        observer.next(this.mapToGrid(msg));
      });
    });
  }

  mapToAxis(value, stats) {
    let std_dev = Math.sqrt(stats.variance);
    let z = (value - stats.mean) / (2 * std_dev);
    if (z < -1) {
      return -1;
    } else if (z > 1) {
      return 1;
         }
    return z;
  }

  mapToGrid(nonMappedPoint) {
    return {
      x: [this.mapToAxis(nonMappedPoint.alpha, this.stats.alpha)],
      y: [this.mapToAxis(nonMappedPoint.beta, this.stats.beta)]
    };
  }

  calculateRelative(msg) {
    const sum = msg['beta'] + msg['alpha'] + msg['theta'];
    return {
      alpha: msg['alpha'] / sum,
      beta: msg['beta'] / sum
    };
  }

  smooth(msg) {
    if (this.smoothPrevious == null) {
      this.smoothPrevious = {
        alpha: msg.alpha,
        beta: msg.beta
      };
      return msg;
    } else {
      this.smoothPrevious = {
        alpha: this.smoothPrevious.alpha * (1 - this.weight) + msg.alpha * (this.weight),
        beta: this.smoothPrevious.beta * (1 - this.weight) + msg.beta * (this.weight)
      };
      return this.smoothPrevious;
    }
  }
}

