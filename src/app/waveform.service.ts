import { Injectable } from '@angular/core';
import * as WaveSurfer from 'wavesurfer.js';
import { EventEmitter } from 'events';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WaveformService {
  private _wavesurfer: any;
  private timeChanged: EventEmitter = new EventEmitter();
  private paused: EventEmitter = new EventEmitter();
  private play: EventEmitter = new EventEmitter();
  private readyObservable: Subject<boolean>;
  private finishedObs: Subject<boolean>;

  constructor() { 
    this.readyObservable = new Subject();
    this.finishedObs = new Subject();
  }

  get wavesurfer() {
    return this._wavesurfer;
  }

  set wavesurfer(ws) {
    this._wavesurfer = ws;
    this._wavesurfer.load('assets/black-parade.wav');

    this._wavesurfer.on('ready', () => {
      this.readyObservable.next(true);
    });

    this._wavesurfer.on('seek', (progress) => {
      this.timeChanged.emit(progress);
    });

    this._wavesurfer.on('play', () => {
      this.play.emit(null);
    });

    this._wavesurfer.on('pause', () => {
      this.paused.emit(null);
    });

    this._wavesurfer.on('finish', () => {
      this.finishedObs.next(true);
    });
  }

  getReadyObservable() {
    return this.readyObservable;
  }

  getFinishObservable() {
    return this.finishedObs;
  }

  onNewTime() {
    return Observable.create(observer => {
      this._wavesurfer.on('audioprocess', (msg) => {
        observer.next(Math.floor(msg*10)/10);
      });
    });
  }

}
