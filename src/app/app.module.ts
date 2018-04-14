import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
