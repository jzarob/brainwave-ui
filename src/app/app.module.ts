import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PlotService  } from './plot.service'
import { WaveformService  } from './waveform.service'


import { AppComponent } from './app.component';
import { WaveformComponent } from './waveform/waveform.component';
import { PlotComponent } from './plot/plot.component';


@NgModule({
  declarations: [
    AppComponent,
    WaveformComponent,
    PlotComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WaveformService, PlotService],
  bootstrap: [AppComponent]
})
export class AppModule { }
