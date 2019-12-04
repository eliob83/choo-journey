import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
// Component imports
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
// Stations
import {StationComponent} from './components/station/station.component';
import {StationListComponent} from './components/station-list/station-list.component';
// Map
import {StationMapComponent} from './components/station-map/station-map.component';
// Journeys
import {JourneyFormComponent} from './components/journey-form/journey-form.component';
import {JourneyListComponent} from './components/journey-list/journey-list.component';
import {JourneyComponent} from './components/journey/journey.component';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
// Bootstrap (ngx)
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDatepickerModule, TimepickerModule, TypeaheadModule} from 'ngx-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    StationComponent,
    StationListComponent,
    StationMapComponent,
    JourneyFormComponent,
    NavbarComponent,
    JourneyComponent,
    JourneyListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // API and forms
    HttpClientModule,
    FormsModule,

    // CSS + bootstrap (ngx)
    FontAwesomeModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
