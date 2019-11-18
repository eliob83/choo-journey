import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StationComponent } from './station/station.component';
import { StationListComponent } from './station-list/station-list.component';
import { StationMapComponent } from './station-map/station-map.component';
import { JourneyComponent } from './journey/journey.component';

@NgModule({
  declarations: [
    AppComponent,
    StationComponent,
    StationListComponent,
    StationMapComponent,
    JourneyComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
