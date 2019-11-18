import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {StationComponent} from './components/station/station.component';
import {StationListComponent} from './components/station-list/station-list.component';
import {StationMapComponent} from './components/station-map/station-map.component';
import {JourneyComponent} from './components/journey/journey.component';

import {ModalModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';

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
    ModalModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
