import { Component, Input, Output } from '@angular/core';
import { StationService } from '../../services/station.service';
import { EventEmitter } from 'events';
import { Station, StationType } from '../../classes/Station';


@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent {

  stations: Array<Station> = [ ];
  selectedStation: Station = null;

  stationName: string;
  notSearched = true;

  constructor(private stationService: StationService) {
    stationService.stationsSubjects.subscribe((data) => {
      this.stations = data;
      this.selectedStation = null;
    });

    stationService.mapSubjects.subscribe(data => {
      this.selectedStation = data;
    });
  }


  searchStations() {
    this.notSearched = false;
    this.stationService.searchStation(this.stationName, 20);
  }

  openStation(station: Station) {
    this.selectedStation = station;
  }
}
