import { Injectable } from '@angular/core';

@Injectable()
export class StatsService {

  constructor() { }

  computeStats(data: any) {
    var stats: any = {};
    stats.alpha = this.computeSingleStats(data.map((x) => {
      return x.alpha;
    }));
    stats.beta = this.computeSingleStats(data.map((x) => {
      return x.beta;
    }));

    return stats;
  }

  private computeSingleStats(data: any[]) {
    var stats: any = {};
    stats.mean = data.reduce((a,b) => {
      return a + b;
    }) / data.length;

    stats.variance = data.reduce((a,b) => {
      return a + Math.pow(b-stats.mean, 2);
    }, 0) / (data.length - 1);

    return stats;
  }

}
