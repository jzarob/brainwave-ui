import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlotService {
  private socket: any;

  constructor() { 
    this.socket = io('https://localhost:5000');
    console.log(this.socket);
  }

  onNewMessage() {
    return Observable.create(observer => {
      this.socket.on('message', msg => {
        observer.next(msg);
      });
    });
  }



}

