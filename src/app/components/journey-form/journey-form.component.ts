import {Component, OnInit} from '@angular/core';

import {StationService} from 'src/app/services/station/station.service';
import {JourneyService} from '../../services/journey/journey.service';

import {Station} from '../../classes/Station';
import {Journey, JourneyDate} from '../../classes/Journey';
import {SearchOption} from '../../classes/Search';

import {TypeaheadMatch} from 'ngx-bootstrap';


@Component({
  selector: 'app-journey-list',
  templateUrl: './journey-form.component.html',
  styleUrls: ['./journey-form.component.css']
})
export class JourneyFormComponent implements OnInit {
  SearchOption = SearchOption;

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
  today: Date;

  // Args for the search function
  // journey: [string, string, string] = [this.stationFrom.id, this.stationTo.id, this.dateJourney];

  // Id of the setTimeout
  idWait = 0;

  // Options for the TypeAhead feature
  maxScroll = 10;
  // Option for the journey request
  nbJourneys = 10;

  // Placeholder for the date input (today)
  placeholderDate: string;

  noResultTo = false;
  noResultFrom = false;


  constructor(private stationService: StationService, private journeyService: JourneyService) {
    // Journeys update observable
    journeyService.journeySubjects.subscribe(data => {
      this.journeys = data;
    });
  }

  ngOnInit() {
    // Initialize today's date then setting up placeholder
    this.today = new Date();
    this.placeholderDate = this.today.getFullYear() + '-' + this.today.getMonth() + '-' + this.today.getDate();
  }

  // Checking the key pressed with the keyExceptions tab
  checkKey(event) {
    this.keyExceptions.forEach(k => {
      if (event.key === k) {
        console.log('Handled');
        return;
      }
    });
  }

  // Initialize the request with delay
  startSearchDelayed(key, str: string, opt: SearchOption): void {
    this.checkKey(key);
    this.idWait = setTimeout(() => {
      this.stationService.searchStation(str, 20, opt);
    }, 400);
    console.log(this.stationFrom);
  }

  // Cancel the delay (also the request)
  stopSearchDelay(event): void {
    this.checkKey(event);
    console.log('Annulation du timeout ' + this.idWait);
    console.log(this.stationFrom.id);
    clearTimeout(this.idWait);
  }

  // Checking the values of departure (id), destination (id) and date (string)
  checkForm(): void {
    /*if (this.journey[0] !== undefined && this.journey[1] !== undefined && this.journey[2] !== undefined) {
      this.reformatDate(this.journey[2]);
      //this.submitJourney(this.journey);
    } else {
      console.log('NON');
    }*/
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
      this.journeyService.searchJourney(this.stationFrom.id, this.stationTo.id, (new JourneyDate(this.dateJourney.toJSON())).getYMD(), 10);
    }
  }

  // Formatting date for the request
  reformatDate(str: string): string {
    const strTab = str.split('-', 3);
    return strTab[0] + strTab[1] + strTab[2];
  }


  typeaheadNoResults(e: boolean, opt: SearchOption) {
    if (opt === SearchOption.TO_INPUT) {
      this.noResultTo = e;
    }
    if (opt === SearchOption.FROM_INPUT) {
      this.noResultFrom = e;
    }
  }
}
