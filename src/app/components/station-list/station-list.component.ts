
import { Component, Input, Output } from '@angular/core';
import { StationService } from '../../services/station.service';
import { EventEmitter } from 'events';
import { Station } from '../../classes/Station';

import { faTrain } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent {
  faTrain = faTrain;

  stations: Array<Station> = [ ];

  stationName: string;
  notSearched = true;

  constructor(private stationService: StationService) {
    stationService.stationsSubjects.subscribe((data) => {
      this.stations = data;
    });
  }


  searchStations() {
    this.notSearched = false;
    this.stationService.searchStation(this.stationName);
  }
}
