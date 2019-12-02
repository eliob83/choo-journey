import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {StationComponent} from './components/station/station.component';
import {StationListComponent} from './components/station-list/station-list.component';
import {StationMapComponent} from './components/station-map/station-map.component';
import {JourneyListComponent} from './components/journey-list/journey-list.component';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDatepickerModule, TimepickerModule, TypeaheadModule} from 'ngx-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NavbarComponent} from './components/navbar/navbar.component';
import { JourneyComponent } from './components/journey/journey.component';


@NgModule({
  declarations: [
    AppComponent,
    StationComponent,
    StationListComponent,
    StationMapComponent,
    JourneyListComponent,
    NavbarComponent,
    JourneyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    HttpClientModule,
    FormsModule,

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
