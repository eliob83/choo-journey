import {Component, OnInit} from '@angular/core';

import {StationService} from 'src/app/services/station/station.service';
import {JourneyService} from '../../services/journey/journey.service';

import {Station} from '../../classes/Station';
import {Journey, JourneyDate} from '../../classes/Journey';
import {SearchOption, SearchState} from '../../classes/Search';

import {TypeaheadMatch} from 'ngx-bootstrap';


@Component({
  selector: 'app-journey-form',
  templateUrl: './journey-form.component.html',
  styleUrls: ['./journey-form.component.css']
})
export class JourneyFormComponent implements OnInit {
  // Options for the observables
  searchOption = SearchOption;

  // Tab where keys are stored. The request will not be sent if one of those keys is pressed.
  private readonly keyExceptions: string[] = [' ', 'Shift', 'Control', 'Alt',
    'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Pause', 'Tab', 'Insert',
    'Home', 'End', 'PageUp', 'PageDown', 'Enter', 'CapsLock', 'AltGraph', 'NumLock'];

  // Option enum
  // Journeys result after search
  journeys: Array<Journey> = [];

  // 3 main inputs in the form
  stationFrom: Station = new Station(null); // Departure
  stationTo: Station = new Station(null); // Destination
  dateJourney: Date; // Date

  // Today's date for datepicker form component
  today: Date;

  // Id of the setTimeout
  idWait: number;

  // Options for the TypeAhead feature
  maxScroll = 10;
  // Option for the journey request
  nbJourneys = 10;

  // Placeholder for the date input (today)
  placeholderDate: string;

  // Booleans : is there no results in the journey form ?
  noResultTo = false;
  noResultFrom = false;

  currentState: SearchState = SearchState.UNDEFINED;
  SearchState = SearchState;


  constructor(private stationService: StationService, private journeyService: JourneyService) {
    // Journeys update observable
    journeyService.journeySubjects.subscribe(data => {
      this.currentState = SearchState.COMPLETED;
      this.journeys = data;
    });
  }

  ngOnInit() {
    // Initialize today's date then setting up placeholder
    this.today = new Date();
    this.placeholderDate = this.today.getFullYear() + '-' + this.today.getMonth() + '-' + this.today.getDate();
  }

  // Checking the key pressed with the keyExceptions tab
  checkKey(event): boolean {
    this.keyExceptions.forEach(k => {
      if (event.key === k) {
        console.log('Handled');
        return true;
      }
    });

    return false;
  }

  // Initialize the request with delay
  startSearchDelayed(key, str: string, opt: SearchOption): void {
    if (this.checkKey(key) === true) { // If not a normal character
      return;
    } else {
      this.idWait = setTimeout(() => {
        this.stationService.searchStation(str, 20, opt);
      }, 400);
      console.log(this.stationFrom);
    }
  }

  // Cancel the delay (also the request)
  stopSearchDelay(event): void {
    if (this.checkKey(event) === true) { // If not a normal character
      return;
    } else {
      console.log('Annulation du timeout ' + this.idWait);
      console.log(this.stationFrom.id);
      clearTimeout(this.idWait);
    }
  }

  // Collecting information from Observables of departure / destination
  getStationId(event: TypeaheadMatch, loc: string): void {
    if (loc === 'from') {
      this.stationFrom = event.item;
    } else if (loc === 'to') {
      this.stationTo = event.item;
    } else {
      console.log('ERR: not a valid location (loc)');
    }
  }

  // Calls service to search journeys
  submitJourney(): void {
    if (this.stationFrom !== undefined && this.stationTo !== undefined && this.dateJourney !== undefined) {
      this.currentState = SearchState.LOADING;
      this.journeyService.searchJourney(this.stationFrom.id, this.stationTo.id, (new JourneyDate(this.dateJourney.toJSON())).getYMD(), 10);
    }
  }

  // If it doesn't match with the API
  typeaheadNoResults(e: boolean, opt: SearchOption) {
    if (opt === SearchOption.TO_INPUT) {
      this.noResultTo = e;
    }
    if (opt === SearchOption.FROM_INPUT) {
      this.noResultFrom = e;
    }
  }
}
