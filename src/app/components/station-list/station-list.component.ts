import {Component} from '@angular/core';

import {StationService} from '../../services/station/station.service';

import {Station} from '../../classes/Station';
import {SearchOption, SearchState} from '../../classes/Search';


@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent {
  // References
  SearchState = SearchState;

  // List items
  stations: Array<Station> = [ ];
  selectedStation: Station = null;

  // Search items
  stationName: string;
  lastStationName: string;

  currentState: SearchState;


  constructor(private stationService: StationService) {
    // List update observable
    stationService.listSearchObservable.subscribe((data) => {
      this.stations = data;
      this.selectedStation = null;
      this.currentState = SearchState.COMPLETED;
    });

    // Map update observable
    stationService.mapSubjects.subscribe(data => {
      this.openStation(data);
    });

    this.currentState = SearchState.UNDEFINED;
  }

  // Search stationName thanks to API
  searchStations() {
    if (this.stationName !== undefined && this.stationName !== '' && this.stationName !== this.lastStationName) {
      this.stationService.searchStation(this.stationName, 5, SearchOption.LIST);

      this.currentState = SearchState.LOADING;
      this.lastStationName = this.stationName;
    }
  }

  // Set station as selected
  openStation(station: Station) {
    this.selectedStation = station;
    if (station !== null && station !== undefined) {
      Function('"use strict";$(\'#collapse' + station.code + '\').collapse(\'show\')').call(null);
    }
  }
}
