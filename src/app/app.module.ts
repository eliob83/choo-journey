import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {StationComponent} from './station/station.component';
import {StationListComponent} from './station-list/station-list.component';
import {StationMapComponent} from './station-map/station-map.component';
import {JourneyComponent} from './journey/journey.component';

import {FormsModule} from '@angular/forms';
import {AlertModule} from 'ngx-bootstrap';

import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    StationComponent,
    StationListComponent,
    StationMapComponent,
    JourneyComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
