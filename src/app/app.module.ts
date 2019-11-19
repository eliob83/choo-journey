import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {StationComponent} from './components/station/station.component';
import {StationListComponent} from './components/station-list/station-list.component';
import {StationMapComponent} from './components/station-map/station-map.component';
import {JourneyComponent} from './components/journey/journey.component';

import {FormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    StationComponent,
    StationListComponent,
    StationMapComponent,
    JourneyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
